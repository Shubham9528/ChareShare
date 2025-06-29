import React, { useState } from 'react';
import { ArrowLeft, Search, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProviderBottomNavigation } from '../ProviderBottomNavigation';
import { OnlineUsers } from './OnlineUsers';
import { ChatList } from './ChatList';
import { ChatView } from './ChatView';
import { useMessages } from '../../../hooks/useMessages';

interface ProviderMessagesPageProps {
  onBack?: () => void;
}

export const ProviderMessagesPage: React.FC<ProviderMessagesPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  
  const { 
    conversations, 
    messages, 
    loading, 
    currentChat, 
    setCurrentChat,
    sendMessage
  } = useMessages();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/provider');
    }
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChat(chatId);
  };

  const handleBackFromChat = () => {
    setCurrentChat(null);
  };

  const handleSendMessage = async (content: string) => {
    if (!currentChat) return;
    
    try {
      await sendMessage(content);
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  // If a chat is selected, show the chat view
  if (currentChat) {
    const selectedChat = conversations.find(chat => chat.id === currentChat);
    if (selectedChat) {
      return (
        <ChatView 
          chat={{
            id: selectedChat.id,
            name: selectedChat.name,
            avatar: selectedChat.avatar_url || '',
            lastMessage: selectedChat.lastMessage,
            lastMessageTime: selectedChat.lastMessageTime,
            unreadCount: selectedChat.unreadCount,
            isOnline: selectedChat.isOnline,
            specialty: selectedChat.specialty
          }}
          messages={messages.map(msg => ({
            id: msg.id,
            senderId: msg.sender_id,
            senderName: msg.sender_id === selectedChat.id ? selectedChat.name : 'You',
            content: msg.content,
            timestamp: msg.created_at,
            isFromMe: msg.sender_id !== selectedChat.id,
            type: msg.message_type
          }))}
          onBack={handleBackFromChat}
          onSendMessage={handleSendMessage}
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
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Chats Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Chats</h2>
              
              {/* Online Users */}
              <OnlineUsers users={conversations.filter(c => c.isOnline).map(c => ({
                id: c.id,
                name: c.name,
                avatar: c.avatar_url || ''
              }))} />
            </div>

            {/* All Messages Section */}
            <div>
              <h3 className="text-base font-medium text-gray-600 mb-4">All messages</h3>
              
              {/* Chat List */}
              {conversations.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600">Your conversations will appear here</p>
                </div>
              ) : (
                <ChatList 
                  chats={conversations.map(conv => ({
                    id: conv.id,
                    name: conv.name,
                    avatar: conv.avatar_url || '',
                    lastMessage: conv.lastMessage,
                    lastMessageTime: conv.lastMessageTime,
                    unreadCount: conv.unreadCount,
                    isOnline: conv.isOnline,
                    specialty: conv.specialty
                  }))} 
                  onChatSelect={handleChatSelect} 
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* Provider Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};