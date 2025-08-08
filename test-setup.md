# Test Setup Guide

## Quick Test Without API Keys

To test the basic functionality without setting up API keys:

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Test the frontend** (should load at http://localhost:3000):
   - The dark mode interface should load
   - You should see the welcome message
   - The input field should be focused

3. **Test the backend** (should be running at http://localhost:5001):
   ```bash
   curl http://localhost:5001/chat-history
   ```
   Should return: `{"chatHistory":[]}`

## Full Test with API Keys

1. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your actual API keys
   ```

2. **Test chat functionality**:
   - Send a message: "Find me information about Tesla"
   - Should get a response from GPT-4

3. **Test save functionality**:
   - Ask for contact information: "Get CEO email for Tesla"
   - Click "Save Contact" button
   - Should save to Airtable

## Expected Behavior

### Frontend
- ✅ Dark mode ChatGPT-like interface
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Auto-scroll to bottom
- ✅ Enter key to send messages

### Backend
- ✅ CORS enabled
- ✅ Chat endpoint working
- ✅ Save endpoint working
- ✅ Error handling
- ✅ In-memory chat history

### Integration
- ✅ Frontend can communicate with backend
- ✅ Real-time chat updates
- ✅ Contact detection and save button
- ✅ Success/error messages 