#!/bin/bash

echo "🧪 Running Airtable Connection Test"
echo "==================================="
echo ""

# Check if we're in the right directory
if [ ! -f "backend/test-airtable-connection.js" ]; then
    echo "❌ Error: test-airtable-connection.js not found in backend directory"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Run the test
echo "Running test from backend directory..."
cd backend && node test-airtable-connection.js

echo ""
echo "Test completed!" 