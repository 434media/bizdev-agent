#!/bin/bash

echo "🔍 Checking BizDev Agent Status..."
echo ""

# Check backend
echo "📡 Backend (Port 5001):"
if curl -s http://localhost:5001/chat-history > /dev/null; then
    echo "   ✅ Running"
else
    echo "   ❌ Not running"
fi

echo ""

# Check frontend
echo "🌐 Frontend (Port 3001):"
if curl -s http://localhost:3001 > /dev/null; then
    echo "   ✅ Running"
else
    echo "   ❌ Not running"
fi

echo ""

# Check API functionality
echo "🤖 API Test:"
RESPONSE=$(curl -s -X POST http://localhost:5001/chat -H "Content-Type: application/json" -d '{"message": "test"}' | grep -o '"response":"[^"]*"' | cut -d'"' -f4)
if [[ $RESPONSE == *"OpenAI API key is not configured"* ]]; then
    echo "   ✅ Working (API key needed)"
else
    echo "   ❌ Error"
fi

echo ""
echo "🎯 Application URLs:"
echo "   Frontend: http://localhost:3001"
echo "   Backend:  http://localhost:5001"
echo ""
echo "💡 To add API keys: cp env.example .env && edit .env" 