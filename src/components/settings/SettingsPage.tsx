import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { SettingsHeader } from './SettingsHeader';
import { UserProfileCard } from './UserProfileCard';
import { SettingsSection } from './SettingsSection';
import { SettingsItem } from './SettingsItem';
import { LogoutPopup } from './LogoutPopup';
import { BottomNavigation } from '../category/BottomNavigation';

interface SettingsPageProps {
  onBack?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState('profile');

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutPopup(false);
  };

  const handleLogoutConfirm = async () => {
    if (isSigningOut) return;
    
    setIsSigningOut(true);
    
    try {
      const result = await signOut();
      
      if (result.error) {
        console.error('Logout failed:', result.error);
        alert('Logout failed: ' + result.error.message);
      }
    } catch (error) {
      console.error('Unexpected logout error:', error);
      alert('An unexpected error occurred during logout');
    } finally {
      setIsSigningOut(false);
      setShowLogoutPopup(false);
    }
  };

  const handleSettingClick = (setting: string) => {
    switch (setting) {
      case 'emergency':
        navigate('/patient/profile');
        break;
      case 'insurance':
        navigate('/patient/profile/setting/insurance');
        break;
      case 'documents':
        navigate('/patient/profile/setting/uploaddoc');
        break;
      case 'favorites':
        navigate('/patient/profile/setting/favorite');
        break;
      case 'privacy':
        navigate('/patient/profile/setting/policy');
        break;
      default:
        console.log(`Navigate to ${setting}`);
        // Implement navigation to other specific settings
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/patient/profile');
    }
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
          navigate('/login-selection');
        }
        break;
      case 'message':
        if (user) {
          navigate('/patient/messages');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'profile':
        if (user) {

        } else {
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
    } else if (path.includes('/profile')) {
      setActiveNavTab('profile');
    } else {
      setActiveNavTab('home');
    }
  }, [location.pathname]);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <SettingsHeader onBack={handleBack} />

        {/* Content */}
        <div className="px-4 py-6 space-y-6 pb-24">
          {/* User Profile Card */}
          <UserProfileCard 
            user={profile}
            onEdit={() => handleSettingClick('profile')}
          />

          {/* General Section */}
          <SettingsSection title="General">
            <SettingsItem
              icon="🚨"
              title="Emergency Information"
              onPress={() => handleSettingClick('emergency')}
            />
            <SettingsItem
              icon="🛡️"
              title="Insurance Benefit Summary"
              onPress={() => handleSettingClick('insurance')}
            />
            <SettingsItem
              icon="📄"
              title="Upload Document"
              onPress={() => handleSettingClick('documents')}
            />
            <SettingsItem
              icon="❤️"
              title="Favorites"
              onPress={() => handleSettingClick('favorites')}
            />
            
          </SettingsSection>

          {/* About Section */}
          <SettingsSection title="About">
            <SettingsItem
              icon="🔒"
              title="Security"
              onPress={() => handleSettingClick('security')}
            />
            <SettingsItem
              icon="❓"
              title="Help Center"
              onPress={() => handleSettingClick('help')}
            />
            <SettingsItem
              icon="📋"
              title="Privacy Policy"
              onPress={() => handleSettingClick('privacy')}
            />
            <SettingsItem
              icon="ℹ️"
              title="About CareCircle"
              onPress={() => handleSettingClick('about')}
            />
          </SettingsSection>

          {/* Logout */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-between p-4 transition-colors duration-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:bg-red-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-lg font-medium text-red-600">
                  Logout
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation 
          activeTab={activeNavTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Logout Confirmation Popup */}
      <LogoutPopup
        isOpen={showLogoutPopup}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isSigningOut}
      />
    </>
  );
};