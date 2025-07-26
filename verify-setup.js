#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 BizDev Agent - Setup Verification\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'OPENAI_API_KEY',
    'AIRTABLE_API_KEY', 
    'AIRTABLE_BASE_ID',
    'AIRTABLE_TABLE_NAME'
  ];
  
  let missingVars = [];
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName + '=')) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length === 0) {
    console.log('✅ All required environment variables are configured');
  } else {
    console.log('⚠️  Missing environment variables:', missingVars.join(', '));
    console.log('   Please update your .env file with the required API keys');
  }
} else {
  console.log('❌ .env file not found');
  console.log('   Please copy env.example to .env and configure your API keys');
}

// Check if dependencies are installed
const backendPackageJson = path.join(__dirname, 'backend', 'package.json');
const frontendPackageJson = path.join(__dirname, 'frontend', 'package.json');

if (fs.existsSync(backendPackageJson)) {
  console.log('✅ Backend package.json found');
} else {
  console.log('❌ Backend package.json not found');
}

if (fs.existsSync(frontendPackageJson)) {
  console.log('✅ Frontend package.json found');
} else {
  console.log('❌ Frontend package.json not found');
}

// Check for node_modules
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
const frontendNodeModules = path.join(__dirname, 'frontend', 'node_modules');

if (fs.existsSync(backendNodeModules)) {
  console.log('✅ Backend dependencies installed');
} else {
  console.log('❌ Backend dependencies not installed - run: cd backend && npm install');
}

if (fs.existsSync(frontendNodeModules)) {
  console.log('✅ Frontend dependencies installed');
} else {
  console.log('❌ Frontend dependencies not installed - run: cd frontend && npm install');
}

console.log('\n🚀 To start the application:');
console.log('   npm run dev');
console.log('\n📖 For more information, see README.md'); 