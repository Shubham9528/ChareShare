import React, { useState } from 'react';
import { ProviderProfileHeader } from './ProviderProfileHeader';
import { ProviderProfileInfo } from './ProviderProfileInfo';
import { ProviderProfileTabs } from './ProviderProfileTabs';
import { ProviderProfileContent } from './ProviderProfileContent';
import { ProviderBottomNavigation } from './ProviderBottomNavigation';
import { useAuth } from '../../contexts/AuthContext';

export type ProviderTab = 'details' | 'posts' | 'articles';

export const ProviderProfilePage: React.FC = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<ProviderTab>('posts');

  // Mock provider data - in real app, this would come from the database
  const providerData = {
    name: profile?.full_name || 'Dr. Sarah Wilson',
    specialization: 'Cardiologist',
    experience: '+4 Year Experience',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200',
    stats: {
      articles: 275,
      followers: 234,
      reviews: 4.9,
    }
  };

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