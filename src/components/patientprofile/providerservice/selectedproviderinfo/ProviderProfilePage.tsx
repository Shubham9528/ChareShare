import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ProviderProfileHeader } from './ProviderProfileHeader';
import { ProviderProfileInfo } from './ProviderProfileInfo';
import { ProviderProfileTabs } from './ProviderProfileTabs';
import { ProviderProfileContent } from './ProviderProfileContent';
import { DetailedProvider } from '../../../types/provider';
import { dbService } from '../../../../lib/supabase';

interface ProviderProfilePageProps {
  provider?: DetailedProvider;
  onBack?: () => void;
  onNavigateToCategory?: () => void;
}

export type ProfileTab = 'details' | 'posts' | 'articles';

export const ProviderProfilePage: React.FC<ProviderProfilePageProps> = ({ 
  provider: propProvider, 
  onBack,
  onNavigateToCategory
}) => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<ProfileTab>('details');
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<DetailedProvider | null>(null);

  // Check if we have a provider from location state or props
  const locationProvider = location.state?.provider;

  // Load provider data
  useEffect(() => {
    const fetchProviderData = async () => {
      // If we already have provider data from props or location state, use it
      if (propProvider) {
        setProvider(propProvider);
        return;
      }
      
      if (locationProvider) {
        setProvider(locationProvider);
        return;
      }
      
      // If we have a provider ID from the URL, fetch the provider data
      if (category) {
        setLoading(true);
        try {
          // Fetch providers by category
          const providers = await dbService.getAllProviders(category);
          
          if (providers && providers.length > 0) {
            // Use the first provider in the category as a fallback
            const providerData = providers[0];
            
            // Transform to DetailedProvider format
            const detailedProvider: DetailedProvider = {
              id: providerData.id,
              name: providerData.user_profile?.full_name || 'Provider Name',
              specialization: providerData.specialization || 'Healthcare Provider',
              description: providerData.bio || "Experienced healthcare provider dedicated to patient care.",
              image: providerData.user_profile?.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
              rating: providerData.rating || 4.5,
              reviewCount: providerData.review_count || 0,
              address: providerData.clinic_address || '123 Medical Center, Downtown',
              distance: '2.5km', // Would need geolocation
              estimatedTime: '20 min', // Would need routing
              availability: 'Mon-Fri',
              hours: '9am - 5pm',
              yearsOfExperience: providerData.years_of_experience || 0,
              consultationFee: providerData.consultation_fee || 0
            };
            
            setProvider(detailedProvider);
          }
        } catch (error) {
          console.error('Error fetching provider data:', error);
          // Set a fallback provider if fetch fails
          setProvider({
            id: '1',
            name: 'Dr. Sarah Chen',
            specialization: 'Dentist',
            description: "Experienced dental professional specializing in cosmetic and general dentistry.",
            image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.8,
            reviewCount: 124,
            address: '2456 Oak Street, Downtown, Toronto 12345',
            distance: '2.1km',
            estimatedTime: '20 min',
            availability: 'Mon-Fri',
            hours: '9am - 6pm',
            yearsOfExperience: 8,
            consultationFee: 1200
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProviderData();
  }, [propProvider, locationProvider, category]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessage = () => {
    if (provider) {
      console.log('Message provider:', provider.name);
      // Implement messaging functionality
    }
  };

  const handleBookAppointment = () => {
    // Navigate to appointment booking page with the new route structure
    if (provider && category) {
      navigate(`/patient/providers/${category}/selectedprofile/selectappoinment`, {
        state: { provider }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Provider Not Found</h3>
          <p className="text-gray-600 mb-4">We couldn't find the provider you're looking for.</p>
          <button
            onClick={() => navigate('/patient/category')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ProviderProfileHeader onBack={onBack} />

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-24">
        {/* Provider Info */}
        <ProviderProfileInfo 
          provider={provider}
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
          provider={provider}
          activeTab={activeTab}
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