import React, { useState } from 'react';
import { ProviderProfileHeader } from './ProviderProfileHeader';
import { ProviderProfileInfo } from './ProviderProfileInfo';
import { ProviderProfileTabs } from './ProviderProfileTabs';
import { ProviderProfileContent } from './ProviderProfileContent';
import { ProviderBottomNavigation } from './ProviderBottomNavigation';
import { useAuth } from '../../contexts/AuthContext';
import { useProviderDetails } from '../../hooks/useProviderDetails';

export type ProviderTab = 'details' | 'posts' | 'articles';

export const ProviderProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ProviderTab>('posts');
  
  // Use the provider details hook for the current user
  const { 
    detailedProvider, 
    provider, 
    loading, 
    updateProviderProfile 
  } = useProviderDetails();

  const handleAddContent = () => {
    console.log('Add new content');
    // Navigate to add post page
    window.location.href = '/provider/addpost';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Provider data from profile or fallback
  const providerData = detailedProvider || {
    id: user?.id || '',
    name: provider?.user_profile?.full_name || 'Provider Name',
    specialization: provider?.specialization || 'Healthcare Provider',
    description: provider?.bio || "Experienced healthcare provider dedicated to patient care.",
    image: provider?.user_profile?.avatar_url || 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: provider?.rating || 4.5,
    reviewCount: provider?.review_count || 0,
    address: provider?.clinic_address || '123 Medical Center, Downtown',
    distance: '2.5km', // Would need geolocation
    estimatedTime: '20 min', // Would need routing
    availability: 'Mon-Fri',
    hours: '9am - 5pm',
    yearsOfExperience: provider?.years_of_experience || 0,
    consultationFee: provider?.consultation_fee || 0
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
          isFollowing={false}
          onFollow={() => {}}
          onMessage={() => {}}
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
          provider={providerData}
        />
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};