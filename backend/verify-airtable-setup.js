require('dotenv').config({ path: '../.env' });
const Airtable = require('airtable');

console.log('🔍 Airtable Setup Verification\n');

// Check environment variables
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const tableName = process.env.AIRTABLE_TABLE_NAME;

console.log('📋 Current Configuration:');
console.log(`API Key: ${apiKey ? '✅ Set' : '❌ Missing'}`);
console.log(`Base ID: "${baseId}"`);
console.log(`Table Name: "${tableName}"`);

if (!apiKey || !baseId || !tableName) {
  console.log('\n❌ Missing required environment variables');
  process.exit(1);
}

console.log('\n🔧 Troubleshooting Steps:');
console.log('========================');

console.log('\n1. Verify your Airtable Base ID:');
console.log(`   - Go to https://airtable.com/api`);
console.log(`   - Look for a base with ID: "${baseId}"`);
console.log(`   - If not found, check your .env file`);

console.log('\n2. Verify your Table Name:');
console.log(`   - Open your Airtable base`);
console.log(`   - Look for a table named: "${tableName}"`);
console.log(`   - Table names are case-sensitive`);

console.log('\n3. Check API Key Permissions:');
console.log(`   - Go to https://airtable.com/account`);
console.log(`   - Check if your API key has access to the base`);
console.log(`   - The base should appear in your "Workspaces"`);

console.log('\n4. Common Issues:');
console.log(`   - Base ID might be different (check the API page)`);
console.log(`   - Table name might be different (check the actual table name)`);
console.log(`   - API key might not have access to this base`);

console.log('\n📝 Next Steps:');
console.log('1. Verify the Base ID and Table Name in your Airtable account');
console.log('2. Update your .env file with the correct values');
console.log('3. Run this test again');
console.log('4. If still having issues, check your API key permissions'); 