import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { MessagingHeader } from './MessagingHeader';
import { OnlineUsers } from './OnlineUsers';
import { ChatList } from './ChatList';
import { ChatView } from './ChatView';
import { BottomNavigation } from '../category/BottomNavigation';
import { useMessages } from '../../../hooks/useMessages';

interface MessagingPageProps {
  onBack?: () => void;
}

export const MessagingPage: React.FC<MessagingPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeNavTab, setActiveNavTab] = useState('message');
  
  const { 
    conversations, 
    messages, 
    loading, 
    currentChat, 
    setCurrentChat,
    sendMessage
  } = useMessages();

  const handleChatSelect = (chatId: string) => {
    setCurrentChat(chatId);
  };

  const handleBackFromChat = () => {
    setCurrentChat(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveNavTab(tab);
    
    // Navigate to different routes based on tab
    const basePath = user ? '/patient' : '/browse';
    
    switch (tab) {
      case 'home':
        if (user) {
          navigate('/patient/category');
        } else {
          navigate('/browse');
        }
        break;
      case 'search':
        navigate(`${basePath}/search`);
        break;
      case 'booking':
        if (user) {
          navigate('/patient/bookings');
        } else {
          // Redirect to login for non-authenticated users
          navigate('/login-selection');
        }
        break;
      case 'message':
        if (user) {
          navigate('/patient/messages');
        } else {
          // Redirect to login for non-authenticated users
          navigate('/login-selection');
        }
        break;
      case 'profile':
        if (user) {
          navigate('/patient/profile/setting');
        } else {
          // Redirect to login for non-authenticated users
          navigate('/login-selection');
        }
        break;
    }
  };

  // Determine current tab based on route
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/search')) {
      setActiveNavTab('search');
    } else if (path.includes('/booking')) {
      setActiveNavTab('booking');
    } else if (path.includes('/message')) {
      setActiveNavTab('message');
    } else if (path.includes('/profile') || path.includes('/setting')) {
      setActiveNavTab('profile');
    } else {
      setActiveNavTab('home');
    }
  }, [location.pathname]);

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
            senderName: msg.sender_id === user?.id ? 'You' : selectedChat.name,
            content: msg.content,
            timestamp: msg.created_at,
            isFromMe: msg.sender_id === user?.id,
            type: msg.message_type
          }))}
          onBack={handleBackFromChat}
          onSendMessage={sendMessage}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <MessagingHeader onBack={onBack} />

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
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeNavTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};