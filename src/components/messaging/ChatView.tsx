import React, { useState } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { Chat, Message } from '../../types/messaging';

interface ChatViewProps {
  chat: Chat;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ chat, onBack }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Implement send message logic
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Mock messages for the chat
  const messages: Message[] = [
    {
      id: '1',
      senderId: chat.id,
      senderName: chat.name,
      content: chat.lastMessage,
      timestamp: chat.lastMessageTime,
      isFromMe: false
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'You',
      content: 'Thank you for the information!',
      timestamp: new Date().toISOString(),
      isFromMe: true
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Chat Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                            ${chat.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div>
                <h1 className="font-semibold text-gray-900">{chat.name}</h1>
                <p className="text-xs text-gray-500">
                  {chat.isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Phone className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Video className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <MoreVertical className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.isFromMe
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isFromMe ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
              <Smile className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 rounded-full text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: newMessage.trim() 
                ? 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' 
                : '#D1D5DB'
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};