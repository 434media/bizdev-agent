const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const Airtable = require('airtable');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI (only if API key is provided)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Initialize Airtable (only if API keys are provided)
let airtable = null;
let base = null;
let table = null;
if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_NAME) {
  airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
  // Trim whitespace from Base ID and Table Name
  const baseId = process.env.AIRTABLE_BASE_ID.trim();
  const tableName = process.env.AIRTABLE_TABLE_NAME.trim();
  console.log(`Initializing Airtable with Base ID: "${baseId}", Table: "${tableName}"`);
  base = airtable.base(baseId);
  table = base(tableName);
}

// In-memory storage for chat history
let chatHistory = [];

// Function to detect management info requests
function isManagementInfoRequest(message) {
  const managementKeywords = [
    'management info', 'management team', 'leadership', 'team contacts',
    'executive team', 'management contacts', 'leadership team', 'team info',
    'management details', 'executive contacts', 'leadership contacts',
    'management information', 'team members', 'executive info',
    'get management', 'find management', 'show management', 'management for'
  ];
  
  const lowerMessage = message.toLowerCase();
  return managementKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Function to extract company name/URL from message
function extractCompanyInfo(message) {
  // Look for URLs in the message (with or without protocol)
  const urlRegex = /(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?/g;
  const urls = message.match(urlRegex);
  
  if (urls && urls.length > 0) {
    let url = urls[0];
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    return { type: 'url', value: url };
  }
  
  // Look for company names (simple heuristic - words that might be company names)
  const words = message.split(' ').filter(word => 
    word.length > 2 && 
    /^[A-Z][a-z]+/.test(word) && 
    !['the', 'and', 'for', 'with', 'about', 'find', 'get', 'show', 'tell'].includes(word.toLowerCase())
  );
  
  if (words.length > 0) {
    return { type: 'name', value: words.join(' ') };
  }
  
  return null;
}

// Function to generate potential team page URLs
function generateTeamPageUrls(companyInfo) {
  const urls = [];
  
  if (companyInfo.type === 'url') {
    const baseUrl = new URL(companyInfo.value);
    const domain = baseUrl.hostname;
    const protocol = baseUrl.protocol;
    
    // Common team page paths (prioritize About pages first)
    const teamPaths = [
      '/about', '/about-us', '/about/team', '/about-us/team', '/team', '/leadership', '/management',
      '/about/leadership', '/about-us/leadership', '/executive-team',
      '/about/executive-team', '/about-us/executive-team', '/our-team',
      '/about/our-team', '/about-us/our-team', '/company/team',
      '/company/leadership', '/company/management', '/company', '/people', '/staff', '/executives', '/board',
      '/leadership', '/management-team'
    ];
    
    teamPaths.forEach(path => {
      urls.push(`${protocol}//${domain}${path}`);
    });
  } else if (companyInfo.type === 'name') {
    // For company names, we'd need to search for their website first
    // For now, return empty array - this would require additional web search
    return [];
  }
  
  return urls;
}

// Function to scrape team page
async function scrapeTeamPage(url) {
  try {
    console.log(`Attempting to scrape: ${url}`);
    
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      maxRedirects: 5
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract email addresses from mailto links
    const emails = [];
    $('a[href^="mailto:"]').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('mailto:')) {
        const email = href.replace('mailto:', '').split('?')[0]; // Remove mailto: and any query parameters
        emails.push(email);
      }
    });
    
    // Remove script, style, and other non-content elements
    $('script, style, nav, footer, header, aside').remove();
    
    // Extract text content
    const textContent = $('body').text();
    
    // Clean up the text
    const cleanedText = textContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
    
    // Only return if we have meaningful content
    if (cleanedText.length > 100) {
      return {
        text: cleanedText,
        emails: emails
      };
    }
    
    return null;
    
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error.message);
    return null;
  }
}

// Function to format team info using GPT
async function formatTeamInfoWithGPT(scrapedData, companyName) {
  try {
    const scrapedText = scrapedData.text || scrapedData;
    const emails = scrapedData.emails || [];
    
    const prompt = `
    Extract and format team member information from the following scraped text from a company's team/leadership page.
    
    Company: ${companyName}
    Scraped Content: ${scrapedText.substring(0, 3000)} // Limiting to first 3000 chars
    Available Email Addresses: ${emails.join(', ')}
    
    Please extract and list team members with the following information:
    - Name
    - Title/Position
    - Email (if available from the provided email list)
    
    IMPORTANT: Remove duplicates and consolidate information for the same person. If you see the same name multiple times with different titles, combine them into a single entry with all relevant titles.
    
    Look for patterns like:
    - "Name" + "Title" (e.g., "Vincent Pham, Co-Founder and CEO")
    - "Title" + "Name" (e.g., "CEO John Smith")
    - Names followed by titles in quotes or bold
    - Executive positions like CEO, CTO, CFO, Founder, Co-Founder, President, Chief Executive Officer, Chief Scientific Officer, etc.
    - Look for "show bio" or similar text that might indicate team member sections
    
    Pay special attention to:
    - Names with titles like "Chief Executive Officer", "Chief Scientific Officer"
    - Names followed by "PhD" or other credentials
    - Text that appears to be team member descriptions
    
    If you find team members and there are email addresses available, try to match them based on:
    - First name matching (e.g., "Vincent" might match "vincent@company.com")
    - Common email patterns (e.g., firstname@company.com, firstname.lastname@company.com)
    
    DUPLICATE HANDLING:
    - If you see the same person mentioned multiple times, combine all their titles into one entry
    - Example: "Vincent Pham, CEO" and "Vincent Pham, Co-Founder" should become "Vincent Pham, Co-Founder & CEO"
    - Only list each person once, even if they appear multiple times in the source text
    
    Format the output in a clean, user-friendly way like this:
    
    ## ${companyName} - Leadership Team
    
    **John Smith**
    Co-Founder & CEO
    john.smith@company.com
    
    **Jane Doe**
    Chief Technology Officer
    jane.doe@company.com
    
    If you find any team members, list them even if you don't have email addresses.
    If no clear team information is found, respond with:
    "I couldn't find specific team information on the company's website. The page may not contain structured leadership data or the content may be in a different format."
    
    Focus on extracting real people with their titles and contact information when available, ensuring no duplicates.
    `;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.3,
    });
    
    return completion.choices[0].message.content;
    
  } catch (error) {
    console.error('Error formatting team info with GPT:', error);
    return 'Sorry, I encountered an error while processing the team information.';
  }
}

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Add user message to history
    chatHistory.push({ role: 'user', content: message });

    let response;
    
    if (!openai) {
      response = "I'm sorry, but the OpenAI API key is not configured. Please set up your OPENAI_API_KEY in the .env file to use the chat functionality.";
    } else {
      // Check if this is a management info request
      if (isManagementInfoRequest(message)) {
        const companyInfo = extractCompanyInfo(message);
        
        if (companyInfo) {
                      if (companyInfo.type === 'url') {
              // Direct URL provided - try About page first, then main page
              const baseUrl = new URL(companyInfo.value);
              const aboutUrl = `${baseUrl.protocol}//${baseUrl.hostname}/about`;
              
              console.log(`Trying About page: ${aboutUrl}`);
              let scrapedData = await scrapeTeamPage(aboutUrl);
              
              if (scrapedData) {
                const domain = baseUrl.hostname;
                response = await formatTeamInfoWithGPT(scrapedData, domain);
                response += `\n\n*Information retrieved from: ${aboutUrl}*`;
              } else {
                // Try main page as fallback
                console.log(`Trying main page: ${companyInfo.value}`);
                scrapedData = await scrapeTeamPage(companyInfo.value);
                
                if (scrapedData) {
                  const domain = baseUrl.hostname;
                  response = await formatTeamInfoWithGPT(scrapedData, domain);
                  response += `\n\n*Note: This information was extracted from the main page since the About page wasn't accessible.*`;
                } else {
                  response = `I couldn't access ${companyInfo.value}. The website might be protected, require authentication, or use JavaScript to load content. You can try:\n\n1. Providing a direct link to their team/leadership page\n2. Checking if the website is accessible in your browser\n3. Looking for their team information on LinkedIn or other professional networks`;
                }
              }
          } else {
            // Company name provided - try common team page URLs
            const teamUrls = generateTeamPageUrls(companyInfo);
            
            if (teamUrls.length > 0) {
              let scrapedData = null;
              let successfulUrl = null;
              
              // Try each potential team page URL
              for (const url of teamUrls) {
                scrapedData = await scrapeTeamPage(url);
                if (scrapedData) {
                  successfulUrl = url;
                  break;
                }
              }
              
              if (scrapedData) {
                response = await formatTeamInfoWithGPT(scrapedData, companyInfo.value);
                response += `\n\n*Information retrieved from: ${successfulUrl}*`;
              } else {
                response = `I couldn't find a team page for ${companyInfo.value}. You can try providing the direct URL to their team/leadership page, or I can help you search for their website first.`;
              }
            } else {
              response = `I need more information to find team details for ${companyInfo.value}. Please provide their website URL or ask me to search for their website first.`;
            }
          }
        } else {
          response = "I'd be happy to help you find management information! Please provide a company name or website URL, and I'll search for their team/leadership details.";
        }
      } else {
        // Regular chat flow
        const conversation = [
          {
            role: 'system',
            content: `You are a business development assistant. When users ask about companies or people, use web search to find accurate, up-to-date information. 
            When providing contact information, be specific and include names, titles, companies, and contact details when available.
            Format your responses clearly and be helpful for business development purposes.
            
            If users ask for management info, team contacts, or leadership information, let them know they can ask me to scrape company websites for this information.`
          },
          ...chatHistory.slice(-10) // Keep last 10 messages for context
        ];

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: conversation,
          max_tokens: 1000,
          temperature: 0.7,
        });

        response = completion.choices[0].message.content;
      }
    }
    
    // Add assistant response to history
    chatHistory.push({ role: 'assistant', content: response });

    res.json({ 
      response,
      chatHistory: chatHistory.slice(-20) // Return last 20 messages
    });

  } catch (error) {
    console.error('Error in /chat endpoint:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

// Save endpoint
app.post('/save', async (req, res) => {
  try {
    console.log('Save endpoint called');
    
    // Get the most recent assistant message that contains contact information
    const recentMessages = chatHistory;
    console.log('Recent messages count:', recentMessages.length);
    
    const contactMessage = recentMessages.reverse().find(msg => 
      msg.role === 'assistant' && 
      (msg.content.toLowerCase().includes('contact') || 
       msg.content.toLowerCase().includes('email') ||
       msg.content.toLowerCase().includes('phone') ||
       msg.content.toLowerCase().includes('ceo') ||
       msg.content.toLowerCase().includes('manager') ||
       msg.content.toLowerCase().includes('@') ||
       msg.content.toLowerCase().includes('chief'))
    );

    if (!contactMessage) {
      console.log('No contact message found in recent messages');
      console.log('Recent messages content:', recentMessages.map(msg => ({
        role: msg.role,
        contentPreview: msg.content.substring(0, 100) + '...'
      })));
      return res.status(400).json({ error: 'No recent contact information found to save' });
    }

    console.log('Found contact message:', contactMessage.content.substring(0, 200) + '...');

    // Use OpenAI to extract structured data
    const extractionPrompt = `
    Extract ALL people mentioned in this message and return them as a JSON array.
    For each person, extract:
    - name: The person's name
    - title: Their job title
    - company: The company name
    - email: Email address if mentioned
    - phone: Phone number if mentioned
    - location: Location if mentioned
    
    Message: "${contactMessage.content}"
    
    Return a JSON array of objects, one for each person found. If a field is not found for a person, use null.
    Example format: [{"name": "John Doe", "title": "CEO", "company": "Tech Corp", "email": "john@tech.com", "phone": null, "location": null}, {"name": "Jane Smith", "title": "CTO", "company": "Tech Corp", "email": "jane@tech.com", "phone": null, "location": null}]
    `;

    console.log('Extraction prompt:', extractionPrompt.substring(0, 200) + '...');

    const extraction = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: extractionPrompt }],
      max_tokens: 800,
      temperature: 0.1,
    });

    console.log('OpenAI extraction response:', extraction.choices[0].message.content);

    let extractedContacts;
    try {
      extractedContacts = JSON.parse(extraction.choices[0].message.content);
      console.log('Parsed extracted contacts:', extractedContacts);
      
      // Ensure we have an array
      if (!Array.isArray(extractedContacts)) {
        extractedContacts = [extractedContacts];
      }
      
      console.log(`Found ${extractedContacts.length} contacts to save`);
    } catch (parseError) {
      console.error('Failed to parse extracted data:', parseError);
      console.error('Raw extraction response:', extraction.choices[0].message.content);
      return res.status(500).json({ error: 'Failed to extract contact information' });
    }

    if (!table) {
      console.log('Airtable table not configured');
      return res.status(400).json({ error: 'Airtable is not configured. Please set up your AIRTABLE_API_KEY, AIRTABLE_BASE_ID, and AIRTABLE_TABLE_NAME in the .env file.' });
    }

    console.log('Airtable table configured, attempting to save...');

    // Prepare records data for all contacts, mapping to correct Airtable field names
    const recordsToCreate = extractedContacts.map(contact => ({
      fields: {
        'Name': contact.name || '', // Capitalize 'Name'
        'Title': contact.title || '',
        'Company': contact.company || '',
        'Email': contact.email || '',
        'Phone': contact.phone || '',
        'Location': contact.location || '',
      }
    }));

    console.log(`Preparing to save ${recordsToCreate.length} records:`, recordsToCreate);

    // Save all contacts to Airtable
    const createdRecords = await table.create(recordsToCreate);

    console.log(`Successfully saved ${createdRecords.length} contacts to Airtable`);

    res.json({ 
      success: true, 
      message: `${createdRecords.length} contact(s) saved successfully`,
      records: createdRecords.map(record => record.fields)
    });

  } catch (error) {
    console.error('Error in /save endpoint:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      error: 'Failed to save contact information',
      details: error.message 
    });
  }
});

// Get chat history endpoint
app.get('/chat-history', (req, res) => {
  res.json({ chatHistory: chatHistory.slice(-50) });
});

// Clear chat history endpoint
app.post('/clear-history', (req, res) => {
  chatHistory = [];
  res.json({ message: 'Chat history cleared' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 