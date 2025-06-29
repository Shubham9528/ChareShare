import React, { useState, useEffect } from 'react';
import { ProviderProfileHeader } from './ProviderProfileHeader';
import { ProviderProfileInfo } from './ProviderProfileInfo';
import { ProviderProfileTabs } from './ProviderProfileTabs';
import { ProviderProfileContent } from './ProviderProfileContent';
import { ProviderBottomNavigation } from './ProviderBottomNavigation';
import { useAuth } from '../../contexts/AuthContext';
import { useProviderProfile } from '../../hooks/useProviderProfile';
import { useProviderPosts } from '../../hooks/useProviderPosts';

export type ProviderTab = 'details' | 'posts' | 'articles';

export const ProviderProfilePage: React.FC = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<ProviderTab>('posts');
  const { providerProfile, loading: profileLoading } = useProviderProfile();
  const { posts, loading: postsLoading, addPost } = useProviderPosts();

  const handleAddContent = () => {
    // Navigate to add post page
    window.location.href = '/provider/addpost';
  };

  if (profileLoading) {
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
      articles: posts.length || 0,
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
          posts={posts}
          loading={postsLoading}
        />
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};