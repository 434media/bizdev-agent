import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Save, Trash2, Loader2, Users, Globe } from 'lucide-react';

const API_BASE_URL = '/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message immediately
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date().toISOString(),
        isManagementInfo: isManagementInfoResponse(response.data.response)
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to detect if response contains management info
  const isManagementInfoResponse = (content) => {
    const managementIndicators = [
      'leadership team', 'executive team', 'management team', 'team members',
      'ceo', 'cto', 'cfo', 'chief', 'founder', 'president', 'director',
      '@', 'email', 'contact'
    ];
    
    const lowerContent = content.toLowerCase();
    return managementIndicators.some(indicator => lowerContent.includes(indicator));
  };

  const saveContact = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/save`);
      
      // Add a success message
      const successMessage = {
        role: 'assistant',
        content: `✅ ${response.data.message}`,
        timestamp: new Date().toISOString(),
        isSuccess: true
      };
      
      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      console.error('Error saving contact:', error);
      const errorMessage = {
        role: 'assistant',
        content: `❌ ${error.response?.data?.error || 'Failed to save contact information'}`,
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSaving(false);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.post(`${API_BASE_URL}/clear-history`);
      setMessages([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSave = messages.some(msg => 
    msg.role === 'assistant' && 
    (msg.content.toLowerCase().includes('contact') || 
     msg.content.toLowerCase().includes('email') ||
     msg.content.toLowerCase().includes('phone') ||
     msg.content.toLowerCase().includes('ceo') ||
     msg.content.toLowerCase().includes('manager') ||
     msg.content.toLowerCase().includes('@') ||
     msg.content.toLowerCase().includes('chief') ||
     msg.isManagementInfo)
  );

  // Function to render message content with better formatting
  const renderMessageContent = (content) => {
    // Split by lines and render each line
    return content.split('\n').map((line, i) => {
      // Check if line contains markdown-style headers
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="text-xl font-bold text-blue-400 mb-2">
            {line.replace('## ', '')}
          </h2>
        );
      }
      
      // Check if line contains bold text (wrapped in **)
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="mb-2 last:mb-0">
            {parts.map((part, j) => 
              j % 2 === 1 ? (
                <strong key={j} className="font-semibold text-white">{part}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      }
      
      // Check if line contains email addresses
      if (line.includes('@')) {
        return (
          <p key={i} className="mb-2 last:mb-0">
            {line.split(' ').map((word, j) => 
              word.includes('@') ? (
                <a 
                  key={j} 
                  href={`mailto:${word}`}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {word}
                </a>
              ) : (
                <span key={j}>{word} </span>
              )
            )}
          </p>
        );
      }
      
      // Regular line
      return (
        <p key={i} className="mb-2 last:mb-0">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-screen bg-chat-dark">
      {/* Header */}
      <header className="bg-chat-darker border-b border-chat-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-semibold text-chat-text">BizDev Agent</h1>
          </div>
          <div className="flex items-center space-x-2">
            {canSave && (
              <button
                onClick={saveContact}
                disabled={isSaving}
                className="save-button flex items-center space-x-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Contact'}</span>
              </button>
            )}
            <button
              onClick={clearHistory}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
              title="Clear chat history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-chat-text-secondary">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Globe className="w-12 h-12 text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Welcome to BizDev Agent</h2>
                <p className="text-lg mb-6">Ask me to find information about companies or get contact details.</p>
                <div className="space-y-2 text-sm">
                  <p>💡 Try: "Find me information about [Company] in [Location]"</p>
                  <p>💡 Try: "Get CEO email for [Company]"</p>
                  <p>💡 Try: "Get management info for [Company URL]"</p>
                  <p>💡 Try: "Show me the leadership team at [Company]"</p>
                  <p>💡 Type "save" after getting contact information</p>
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.role === 'user' ? 'user-message' : 'assistant-message'
              } ${message.isManagementInfo ? 'management-info' : ''}`}
            >
              <div className="max-w-3xl mx-auto">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : message.isManagementInfo
                      ? 'bg-purple-600 text-white'
                      : 'bg-green-600 text-white'
                  }`}>
                    {message.role === 'user' ? 'U' : message.isManagementInfo ? 'T' : 'A'}
                  </div>
                  <div className="flex-1">
                    <div className={`prose prose-invert max-w-none ${
                      message.isError ? 'text-red-400' : 
                      message.isSuccess ? 'text-green-400' : 
                      message.isManagementInfo ? 'text-purple-100' :
                      'text-chat-text'
                    }`}>
                      {renderMessageContent(message.content)}
                    </div>
                    <div className="text-xs text-chat-text-secondary mt-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-message assistant-message">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-semibold text-white">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-chat-text" />
                      <span className="text-chat-text">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-chat-darker border-t border-chat-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className="chat-input"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="send-button flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 