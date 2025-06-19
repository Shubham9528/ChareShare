import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { ProviderCard } from './ProviderCard';
import { FloatingActionButton } from './FloatingActionButton';
import { BottomNavigation } from './BottomNavigation';
import { providersData } from '../../data/providersData';
import { Provider } from '../../types/provider';
import { useAuth } from '../../contexts/AuthContext';
import { Info } from 'lucide-react';

interface CategoryPageProps {
  onBack?: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('home');

  const handleProviderSelect = (providerId: string) => {
    setSelectedProviders(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const handleProviderCardClick = (provider: Provider) => {
    const basePath = user ? '/patient/providers' : '/browse/providers';
    navigate(`${basePath}/${provider.category.toLowerCase()}`);
  };

  const handleShare = () => {
    console.log('Share functionality');
  };

  const handleFloatingAction = () => {
    console.log('Add new provider');
  };

  const handleInfoClick = () => {
    // Open external link in new tab
    
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
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
      setActiveTab('search');
    } else if (path.includes('/booking')) {
      setActiveTab('booking');
    } else if (path.includes('/message')) {
      setActiveTab('message');
    } else if (path.includes('/profile') || path.includes('/setting')) {
      setActiveTab('profile');
    } else {
      setActiveTab('home');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <CategoryHeader 
        onBack={onBack}
        onShare={handleShare}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 pb-24">
        {/* Welcome Message */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {user ? 'Welcome back!' : 'Welcome to CareCircle'}
          </h2>
          <p className="text-gray-600">
            {user 
              ? 'Find and book appointments with healthcare providers' 
              : 'Browse our healthcare providers and sign in to book appointments'
            }
          </p>
        </div>

        {/* Providers Grid with Info Icon */}
        <div className="relative max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {providersData.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                isSelected={selectedProviders.includes(provider.id)}
                onSelect={() => handleProviderSelect(provider.id)}
                onCardClick={() => handleProviderCardClick(provider)}
              />
            ))}
          </div>
          
          {/* Centered Info Icon - Larger Size */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button 
              className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl transition-all                 duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200 pointer-events-auto"
              onClick={handleInfoClick}
              title="Learn how to choose the right healthcare provider"
            >
              <img 
                src="/profiledp.svg" 
                alt="Info" 
                className="w-16 h-16" 
              />
            </button>

          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleFloatingAction} />

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};