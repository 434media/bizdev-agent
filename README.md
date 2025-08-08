# BizDev Agent - Enhanced ChatGPT-like Interface

A powerful business development assistant with web scraping capabilities for extracting management and team information from company websites.

## 🚀 Features

### Core Functionality
- **ChatGPT-like Interface**: Natural conversation with AI-powered responses
- **Web Scraping**: Automatically extract team/management information from company websites
- **Contact Management**: Save extracted contact information to Airtable
- **Real-time Chat**: Interactive chat interface with message history

### Management Info Detection
The system automatically detects when users request management information using keywords like:
- "management info"
- "management team" 
- "leadership"
- "team contacts"
- "executive team"
- "management contacts"
- "leadership team"
- "team info"
- "management details"
- "executive contacts"
- "leadership contacts"
- "management information"
- "team members"
- "executive info"

### Web Scraping Workflow
1. **Detection**: System identifies management info requests
2. **URL Extraction**: Extracts company URLs or names from user messages
3. **Page Discovery**: Generates potential team page URLs (e.g., `/team`, `/about/team`, `/leadership`)
4. **Content Scraping**: Uses `axios` and `cheerio` to extract page content
5. **GPT Processing**: Sends scraped content to GPT-4 for structured extraction
6. **Formatted Output**: Returns clean, formatted team information

### Enhanced Save Functionality
- Automatically detects contact information in responses
- Extracts structured data (name, title, company, email, phone, location)
- Saves to Airtable with proper formatting
- Supports both manual and scraped contact information

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express
- **OpenAI GPT-4** for AI responses and data extraction
- **Airtable** for contact storage
- **Axios** for HTTP requests
- **Cheerio** for HTML parsing and web scraping

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bizdev-agent
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   AIRTABLE_API_KEY=your_airtable_api_key_here
   AIRTABLE_BASE_ID=your_airtable_base_id_here
   AIRTABLE_TABLE_NAME=your_airtable_table_name_here
   PORT=5001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage Examples

### Basic Company Information
```
User: "Find me information about Tesla"
Assistant: [Provides general company information]
```

### Management Team Requests
```
User: "Get management info for https://example.com"
Assistant: [Scrapes website and returns formatted team information]

User: "Show me the leadership team at Apple"
Assistant: [Attempts to find and scrape Apple's team page]
```

### Contact Information
```
User: "Get CEO email for Microsoft"
Assistant: [Provides contact information]
User: "save"
Assistant: [Saves contact to Airtable]
```

## 🔧 Configuration

### Airtable Setup
Create a table with the following columns:
- `Name` (Single line text)
- `Title` (Single line text) 
- `Company` (Single line text)
- `Email` (Email)
- `Phone` (Phone number)
- `Location` (Single line text)
- `Source Message` (Long text)
- `Date Added` (Date)

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key
- `AIRTABLE_API_KEY`: Your Airtable API key
- `AIRTABLE_BASE_ID`: Your Airtable base ID
- `AIRTABLE_TABLE_NAME`: Your Airtable table name
- `PORT`: Server port (default: 5001)

## 🚀 Development

### Available Scripts
- `npm run dev`: Start both frontend and backend in development mode
- `npm run server`: Start backend server only
- `npm run client`: Start frontend only
- `npm run build`: Build frontend for production
- `npm start`: Start production server

### Project Structure
```
bizdev-agent/
├── backend/
│   ├── server.js          # Main server file with scraping logic
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   └── index.css      # Styling
│   └── package.json       # Frontend dependencies
├── package.json           # Root package.json with scripts
└── env.example           # Environment variables template
```

## 🔍 How It Works

### 1. Message Processing
When a user sends a message, the system:
- Checks if it's a management info request
- Extracts company information (URL or name)
- Determines the appropriate response path

### 2. Web Scraping Process
For management info requests:
1. **URL Generation**: Creates potential team page URLs
2. **Page Access**: Attempts to access each URL with proper headers
3. **Content Extraction**: Uses Cheerio to parse HTML and extract text
4. **Content Cleaning**: Removes scripts, styles, and formats text
5. **GPT Processing**: Sends cleaned content to GPT-4 for structured extraction
6. **Response Formatting**: Returns formatted team information

### 3. Save Process
When saving contact information:
1. **Detection**: Identifies recent messages with contact info
2. **Extraction**: Uses GPT-4 to extract structured data
3. **Validation**: Ensures required fields are present
4. **Storage**: Saves to Airtable with metadata

## 🛡️ Error Handling

- **Scraping Failures**: Graceful handling when websites are inaccessible
- **Rate Limiting**: Proper timeouts and user agent headers
- **Invalid URLs**: Validation before scraping attempts
- **API Errors**: Clear error messages for users
- **Network Issues**: Retry logic and fallback responses

## 🔒 Security Considerations

- **User Agent**: Uses realistic browser user agent for scraping
- **Timeouts**: Prevents hanging requests
- **Input Validation**: Validates URLs and company names
- **Rate Limiting**: Respects website access patterns
- **Error Logging**: Comprehensive error tracking

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
Ensure all environment variables are properly configured in production.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review error logs
3. Test with different URLs/companies
4. Open an issue with detailed information

---

**Note**: This tool is designed for legitimate business development purposes. Please respect website terms of service and robots.txt files when scraping content.