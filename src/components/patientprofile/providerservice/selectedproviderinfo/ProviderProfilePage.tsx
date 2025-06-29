import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ProviderProfileHeader } from './ProviderProfileHeader';
import { ProviderProfileInfo } from './ProviderProfileInfo';
import { ProviderProfileTabs } from './ProviderProfileTabs';
import { ProviderProfileContent } from './ProviderProfileContent';
import { DetailedProvider } from '../../../types/provider';
import { useAuth } from '../../../../contexts/AuthContext';
import { dbService } from '../../../../lib/supabase';

interface ProviderProfilePageProps {
  provider: DetailedProvider;
  onBack?: () => void;
  onNavigateToCategory?: () => void;
}

export type ProfileTab = 'details' | 'posts' | 'articles';

export const ProviderProfilePage: React.FC<ProviderProfilePageProps> = ({ 
  provider, 
  onBack,
  onNavigateToCategory
}) => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>('details');
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Check if we have a provider from location state
  const locationProvider = location.state?.provider;
  const providerToUse = locationProvider || provider;

  // Fetch provider reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!providerToUse?.id) return;
      
      try {
        setLoading(true);
        const data = await dbService.getProviderReviews(providerToUse.id);
        setReviews(data || []);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [providerToUse?.id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessage = () => {
    console.log('Message provider:', providerToUse.name);
    // Implement messaging functionality
    if (user) {
      navigate('/patient/messages');
    } else {
      navigate('/login-selection');
    }
  };

  const handleBookAppointment = () => {
    // Navigate to appointment booking page with the new route structure
    navigate(`/patient/providers/${category}/selectedprofile/selectappoinment`, {
      state: { provider: providerToUse }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ProviderProfileHeader onBack={onBack} />

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-24">
        {/* Provider Info */}
        <ProviderProfileInfo 
          provider={providerToUse}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onMessage={handleMessage}
        />

        {/* Tabs */}
        <ProviderProfileTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <ProviderProfileContent 
          provider={providerToUse}
          activeTab={activeTab}
          reviews={reviews}
          loading={loading}
        />
      </div>

      {/* Book Appointment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={handleBookAppointment}
          className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200"
          style={{
            background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
          }}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};