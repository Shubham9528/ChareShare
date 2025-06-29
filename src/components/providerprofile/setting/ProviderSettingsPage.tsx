import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, LogOut, User, Package, Globe, Shield, HelpCircle, Lock, Info, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { LogoutPopup } from './logoutpopup/LogoutPopup';
import { MessageFollowersPopup } from './messagefollowers/MessageFollowersPopup';

export const ProviderSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showMessageFollowersPopup, setShowMessageFollowersPopup] = useState(false);

  const handleBack = () => {
    navigate('/provider');
  };

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
      // Clear local state first for better UX
      localStorage.removeItem('selectedUserType');
      
      const result = await signOut();
      
      if (result.error) {
        console.error('Logout failed:', result.error);
        // Even if there's an error, we'll still redirect to the welcome page
        // This handles the case where the session is already expired on the server
      }
      
      // Always navigate to welcome page after logout attempt
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Unexpected logout error:', error);
      // Still navigate to welcome page
      navigate('/', { replace: true });
    } finally {
      setIsSigningOut(false);
      setShowLogoutPopup(false);
    }
  };

  const handleSettingClick = (setting: string) => {
    switch (setting) {
      case 'profile':
        navigate('/provider/setting/editprofile');
        break;
      case 'privacy':
        navigate('/provider/setting/policy');
        break;
      case 'package':
        navigate('/provider/setting/package');
        break;
      case 'about':
        navigate('/provider/setting/about');
        break;
      case 'messageFollowers':
        setShowMessageFollowersPopup(true);
        break;
      default:
        console.log(`Navigate to ${setting}`);
        // Implement navigation to other specific settings
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">
              Profile
            </h1>
            
            {/* Empty div for spacing */}
            <div className="w-10"></div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 py-6 space-y-6 pb-24">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100">
            <button
              onClick={() => handleSettingClick('profile')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="flex items-center space-x-4">
                {/* Profile Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                              ${(profile.full_name || 'User').split(' ').map(n => n[0]).join('')}
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                
                {/* User Info */}
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {profile?.full_name || 'Provider Name'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {profile?.email || 'provider@example.com'}
                  </p>
                </div>
              </div>
              
              {/* Chevron */}
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* General Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide px-2">
              General
            </h2>
            
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
              <button
                onClick={() => handleSettingClick('package')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Package</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => handleSettingClick('messageFollowers')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Message Followers</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide px-2">
              About
            </h2>
            
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
              <button
                onClick={() => handleSettingClick('security')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Security</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => handleSettingClick('help')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Help Center</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => handleSettingClick('privacy')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Privacy Policy</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => handleSettingClick('about')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 last:rounded-b-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Info className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-base font-medium text-gray-900">About CareCircle</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="bg-white rounded-2xl border border-gray-100">
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
      </div>

      {/* Logout Confirmation Popup */}
      <LogoutPopup
        isOpen={showLogoutPopup}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isSigningOut}
      />

      {/* Message Followers Popup */}
      <MessageFollowersPopup
        isOpen={showMessageFollowersPopup}
        onClose={() => setShowMessageFollowersPopup(false)}
      />
    </>
  );
};