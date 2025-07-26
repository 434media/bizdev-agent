#!/bin/bash

echo "🚀 Starting BizDev Agent..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please copy env.example to .env and configure your API keys:"
    echo "cp env.example .env"
    echo ""
fi

# Start the application
echo "📦 Installing dependencies and starting servers..."
npm run dev 