import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MessagingHeader } from './MessagingHeader';
import { OnlineUsers } from './OnlineUsers';
import { ChatList } from './ChatList';
import { ChatView } from './ChatView';
import { BottomNavigation } from '../category/BottomNavigation';
import { messagesData } from '../../data/messagesData';

interface MessagingPageProps {
  onBack?: () => void;
}

export const MessagingPage: React.FC<MessagingPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [activeNavTab, setActiveNavTab] = useState('message');

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleBackFromChat = () => {
    setSelectedChatId(null);
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
      <MessagingHeader onBack={onBack} />

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

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeNavTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};