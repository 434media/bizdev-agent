require('dotenv').config({ path: '../.env' });
const Airtable = require('airtable');

async function testAirtableConnection() {
  console.log('🔍 Testing Airtable Connection and Configuration\n');

  // Step 1: Check Environment Variables
  console.log('📋 Step 1: Environment Variables Check');
  console.log('=====================================');
  
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;
  
  console.log(`API Key: ${apiKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`Base ID: "${baseId}" ${baseId ? '✅ Set' : '❌ Missing'}`);
  console.log(`Table Name: "${tableName}" ${tableName ? '✅ Set' : '❌ Missing'}`);
  
  // Debug: Show the actual values
  console.log('\n🔍 Debug Information:');
  console.log(`Raw Base ID: "${baseId}"`);
  console.log(`Raw Table Name: "${tableName}"`);
  console.log(`Base ID length: ${baseId ? baseId.length : 0}`);
  console.log(`Table Name length: ${tableName ? tableName.length : 0}`);
  
  if (!apiKey || !baseId || !tableName) {
    console.log('\n❌ Missing required environment variables. Please check your .env file.');
    return;
  }

  // Step 2: Initialize Airtable
  console.log('\n🔧 Step 2: Airtable Initialization');
  console.log('==================================');
  
  try {
    const airtable = new Airtable({ apiKey });
    const trimmedBaseId = baseId.trim();
    const trimmedTableName = tableName.trim();
    
    console.log(`Initializing with Base ID: "${trimmedBaseId}"`);
    console.log(`Initializing with Table Name: "${trimmedTableName}"`);
    
    const base = airtable.base(trimmedBaseId);
    const table = base(trimmedTableName);
    
    console.log('✅ Airtable initialized successfully');
    
      // Step 3: Test Base Access
  console.log('\n📊 Step 3: Testing Base Access');
  console.log('==============================');
  
  try {
    // Try to access the base by attempting to read from the table
    console.log('Testing base access by attempting to read from table...');
    const records = await table.select({ maxRecords: 1 }).firstPage();
    console.log(`✅ Successfully accessed base and table`);
    console.log(`   Found ${records.length} records in table "${trimmedTableName}"`);
    
    if (records.length > 0) {
      console.log('   Sample record fields:', Object.keys(records[0].fields));
    }
  } catch (error) {
    console.log(`❌ Failed to access base/table: ${error.message}`);
    console.log('   This might mean:');
    console.log('   - The Base ID is incorrect');
    console.log('   - The Table Name is incorrect');
    console.log('   - The API key lacks permissions');
    console.log('   - The table doesn\'t exist');
    return;
  }
    
    // Step 4: Test Table Schema
    console.log('\n📋 Step 4: Testing Table Schema');
    console.log('===============================');
    
    try {
      // Try to get table schema by reading a record
      const records = await table.select({ maxRecords: 1 }).firstPage();
      console.log(`✅ Successfully accessed table "${trimmedTableName}"`);
      console.log(`   Found ${records.length} records in table`);
      
      if (records.length > 0) {
        console.log('   Available fields:', Object.keys(records[0].fields));
      } else {
        console.log('   Table is empty, but accessible');
      }
    } catch (error) {
      console.log(`❌ Failed to access table "${trimmedTableName}": ${error.message}`);
      console.log('   This might mean the table name is incorrect');
      return;
    }
    
    // Step 5: Test Record Creation
    console.log('\n➕ Step 5: Testing Record Creation');
    console.log('==================================');
    
    const testRecordData = {
      fields: {
        'name': 'John Smith',
        'title': 'Chief Technology Officer',
        'company': 'Tech Innovations Inc',
        'email': 'john.smith@techinnovations.com',
        'phone': '+1 (555) 123-4567',
        'date_added': new Date().toISOString()
      }
    };
    
    console.log('Creating test record with data:', testRecordData);
    
    try {
      const createdRecord = await table.create([testRecordData]);
      console.log('✅ Successfully created test record!');
      console.log('   Record ID:', createdRecord[0].id);
      console.log('   Created fields:', createdRecord[0].fields);
      console.log('   📝 This record has been saved to your Airtable table');
      
      // Step 6: Record Summary
      console.log('\n📊 Step 6: Record Summary');
      console.log('==========================');
      console.log('✅ Test record created and saved permanently');
      console.log('   You can view this record in your Airtable base');
      console.log('   Record details:');
      console.log('   - Name: John Smith');
      console.log('   - Title: Chief Technology Officer');
      console.log('   - Company: Tech Innovations Inc');
      console.log('   - Email: john.smith@techinnovations.com');
      console.log('   - Phone: +1 (555) 123-4567');
      
    } catch (createError) {
      console.log(`❌ Failed to create test record: ${createError.message}`);
      console.log('   Error details:', {
        name: createError.name,
        statusCode: createError.statusCode,
        error: createError.error
      });
      return;
    }
    
    // Step 7: Summary
    console.log('\n🎉 Step 7: Test Summary');
    console.log('=======================');
    console.log('✅ All tests passed! Your Airtable configuration is working correctly.');
    console.log('✅ A test record has been created in your Airtable table.');
    console.log('✅ The web scraping save functionality should now work properly.');
    console.log('\n📝 Next steps:');
    console.log('   1. Check your Airtable base to see the new test record');
    console.log('   2. Try scraping a company website');
    console.log('   3. Click "Save Contact" to test the full workflow');
    console.log('   4. Verify that real contact data gets saved correctly');
    
  } catch (error) {
    console.log('\n❌ Airtable initialization failed:', error.message);
    console.log('   Error details:', {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      error: error.error
    });
  }
}

// Run the test
testAirtableConnection().catch(error => {
  console.error('Test failed with error:', error);
}); 