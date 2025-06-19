import React, { useState } from 'react';
import { SearchHeader } from './SearchHeader';
import { SearchTabs } from './SearchTabs';
import { PhotoGrid } from './PhotoGrid';
import { BottomNavigation } from '../category/BottomNavigation';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SearchPageProps {
  onBack?: () => void;
}

export type SearchTab = 'all' | 'photos' | 'videos' | 'articles';

export const SearchPage: React.FC<SearchPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('photos');
  const [activeNavTab, setActiveNavTab] = useState('search');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Search Bar */}
      <SearchHeader 
        onBack={onBack}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      {/* Content */}
      <div className="flex-1 pb-24">
        {/* Search Tabs */}
        <SearchTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Results Content */}
        <div className="px-4 py-4">
          {activeTab === 'photos' && <PhotoGrid searchQuery={searchQuery} />}
          {activeTab === 'videos' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
              <p className="text-gray-600">Video search results would appear here</p>
            </div>
          )}
          {activeTab === 'articles' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Article search results would appear here</p>
            </div>
          )}
          {activeTab === 'all' && <PhotoGrid searchQuery={searchQuery} />}
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