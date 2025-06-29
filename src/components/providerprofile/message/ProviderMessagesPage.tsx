import React, { useState } from 'react';
import { ArrowLeft, Search, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProviderBottomNavigation } from '../ProviderBottomNavigation';
import { OnlineUsers } from './OnlineUsers';
import { ChatList } from './ChatList';
import { ChatView } from './ChatView';
import { messagesData } from '../../../data/messagesData';

interface ProviderMessagesPageProps {
  onBack?: () => void;
}

export const ProviderMessagesPage: React.FC<ProviderMessagesPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/provider');
    }
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleBackFromChat = () => {
    setSelectedChatId(null);
  };

  // If a chat is selected, show the chat view
  if (selectedChatId) {
    const selectedChat = messagesData.find(chat => chat.id === selectedChatId);
    if (selectedChat) {
      return (
        <ChatView 
          chat={selectedChat} 
          onBack={handleBackFromChat} 
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Back Button */}
          {/*  */}

          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900">
            Messages
          </h1>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Search className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Trash2 className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-6 pb-24">
        {/* Chats Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chats</h2>
          
          {/* Online Users */}
          <OnlineUsers />
        </div>

        {/* All Messages Section */}
        <div>
          <h3 className="text-base font-medium text-gray-600 mb-4">All messages</h3>
          
          {/* Chat List */}
          <ChatList 
            chats={messagesData} 
            onChatSelect={handleChatSelect} 
          />
        </div>
      </div>

      {/* Provider Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};