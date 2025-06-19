import React, { useState, useEffect } from 'react';
import { ProviderProfileHeader } from './ProviderProfileHeader';
import { ProviderProfileInfo } from './ProviderProfileInfo';
import { ProviderProfileTabs } from './ProviderProfileTabs';
import { ProviderProfileContent } from './ProviderProfileContent';
import { ProviderBottomNavigation } from './ProviderBottomNavigation';
import { useAuth } from '../../contexts/AuthContext';
import { useProviderProfile } from '../../hooks/useProviderProfile';

export type ProviderTab = 'details' | 'posts' | 'articles';

export const ProviderProfilePage: React.FC = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<ProviderTab>('posts');
  const { providerProfile, loading } = useProviderProfile();

  const handleEdit = () => {
    console.log('Edit profile');
    // Implement edit functionality
  };

  const handleShare = () => {
    console.log('Share profile');
    // Implement share functionality
  };

  const handleAddContent = () => {
    console.log('Add new content');
    // Implement add content functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Provider data from profile or fallback
  const providerData = {
    id: user?.id || '',
    name: profile?.full_name || 'Dr. Sarah Wilson',
    specialization: providerProfile?.specialization || 'Healthcare Provider',
    experience: `+${providerProfile?.years_of_experience || 0} Year Experience`,
    avatar: profile?.avatar_url || 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200',
    stats: {
      articles: 275,
      followers: 234,
      reviews: providerProfile?.rating || 4.9,
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ProviderProfileHeader />

      {/* Content */}
      <div className="pb-20">
        {/* Provider Info */}
        <ProviderProfileInfo 
          provider={providerData}
          onEdit={handleEdit}
          onShare={handleShare}
        />

        {/* Tabs */}
        <ProviderProfileTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <ProviderProfileContent 
          activeTab={activeTab}
          onAddContent={handleAddContent}
        />
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};