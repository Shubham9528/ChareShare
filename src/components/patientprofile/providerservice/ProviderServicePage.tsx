import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ProviderServiceHeader } from './ProviderServiceHeader';
import { SearchFilters } from './SearchFilters';
import { ProviderResults } from './ProviderResults';
import { ProviderProfilePage } from './selectedproviderinfo/ProviderProfilePage';
import { useProviders } from '../../../hooks/useProviders';
import { DetailedProvider } from '../../../types/provider';
import { dbService } from '../../../lib/supabase';

interface ProviderServicePageProps {
  onBack?: () => void;
  selectedProvider?: any;
  onNavigateToCategory?: () => void;
}

export type SortOption = 'default' | 'rating' | 'distance' | 'price';

export const ProviderServicePage: React.FC<ProviderServicePageProps> = ({ 
  onBack, 
  selectedProvider,
  onNavigateToCategory
}) => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDetailedProvider, setSelectedDetailedProvider] = useState<DetailedProvider | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    providers,
    loading,
    favorites,
    sortBy,
    setSortBy,
    setCategory,
    setSearchTerm,
    toggleFavorite
  } = useProviders(category);

  // Set category from URL params
  useEffect(() => {
    if (category) {
      setCategory(category);
    }
  }, [category, setCategory]);

  // Check if we're on the selected profile route
  const isSelectedProfileRoute = window.location.pathname.includes('/selectedprofile');

  // Get provider from location state if available
  const locationProvider = location.state?.provider;

  // If we're on the selected profile route but don't have a provider, fetch it
  useEffect(() => {
    const fetchProviderDetails = async () => {
      // If we already have a provider from location state, use it
      if (locationProvider) {
        setSelectedDetailedProvider(locationProvider);
        return;
      }
      
      // If we're on the selected profile route but don't have a provider, try to get one from the providers list
      if (isSelectedProfileRoute && providers.length > 0 && !selectedDetailedProvider) {
        // Find a provider that matches the category
        const matchingProvider = providers.find(p => 
          p.specialization?.toLowerCase() === category?.toLowerCase()
        );
        
        if (matchingProvider) {
          // Convert to DetailedProvider format
          setSelectedDetailedProvider({
            id: matchingProvider.id,
            name: matchingProvider.user_profile?.full_name || 'Provider Name',
            specialization: matchingProvider.specialization || 'Healthcare Provider',
            description: matchingProvider.bio || "Experienced healthcare provider dedicated to patient care.",
            image: matchingProvider.user_profile?.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: matchingProvider.rating || 4.5,
            reviewCount: matchingProvider.review_count || 0,
            address: matchingProvider.clinic_address || '123 Medical Center, Downtown',
            distance: '2.5km', // Would need geolocation
            estimatedTime: '20 min', // Would need routing
            availability: 'Mon-Fri',
            hours: '9am - 5pm',
            yearsOfExperience: matchingProvider.years_of_experience || 0,
            consultationFee: matchingProvider.consultation_fee || 0
          });
        }
      }
    };

    fetchProviderDetails();
  }, [isSelectedProfileRoute, providers, category, locationProvider, selectedDetailedProvider]);

  const handleProviderTypeChange = (type: string) => {
    setCategory(type);
  };

  const handleLocationChange = (loc: string) => {
    // Location filtering would require geolocation features
    console.log('Location filter:', loc);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
  };

  const handleProviderCardClick = (provider: DetailedProvider) => {
    setSelectedDetailedProvider(provider);
    // Update URL to show selected profile
    const newUrl = window.location.pathname.replace(/\/providers\/[^/]+$/, `/providers/${category}/selectedprofile`);
    navigate(newUrl, { state: { provider } });
  };

  const handleBackFromProfile = () => {
    setSelectedDetailedProvider(null);
    // Update URL to go back to provider list
    const newUrl = window.location.pathname.replace('/selectedprofile', '');
    navigate(newUrl);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Navigate back to patient category page
      window.location.href = '/patient/category';
    }
  };

  // If we're on the selected profile route or a detailed provider is selected, show the profile page
  if (isSelectedProfileRoute || selectedDetailedProvider) {
    // If we don't have a selected provider but we're on the route, select the first one
    const providerToShow = selectedDetailedProvider || (providers.length > 0 ? providers[0] : null);
    
    if (!providerToShow && loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading provider details...</p>
          </div>
        </div>
      );
    }
    
    if (!providerToShow) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Provider not found</h3>
            <p className="text-gray-600 mb-6">We couldn't find the provider you're looking for.</p>
            <button
              onClick={handleBackFromProfile}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go back to providers
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <ProviderProfilePage 
        provider={{
          id: providerToShow.id,
          name: providerToShow.user_profile?.full_name || 'Provider Name',
          specialization: providerToShow.specialization || 'Healthcare Provider',
          description: providerToShow.bio || "Experienced healthcare provider dedicated to patient care.",
          image: providerToShow.user_profile?.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
          rating: providerToShow.rating || 4.5,
          reviewCount: providerToShow.review_count || 0,
          address: providerToShow.clinic_address || '123 Medical Center, Downtown',
          distance: '2.5km', // Would need geolocation
          estimatedTime: '20 min', // Would need routing
          availability: 'Mon-Fri',
          hours: '9am - 5pm',
          yearsOfExperience: providerToShow.years_of_experience || 0,
          consultationFee: providerToShow.consultation_fee || 0
        }}
        onBack={handleBackFromProfile}
        onNavigateToCategory={onNavigateToCategory}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <ProviderServiceHeader onBack={handleBack} />

      {/* Content */}
      <div className="flex-1 px-4 py-6 pb-24">
        {/* Search Filters */}
        <SearchFilters
          providerType={category || ''}
          location="Toronto Ontario"
          onProviderTypeChange={handleProviderTypeChange}
          onLocationChange={handleLocationChange}
        />

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ProviderResults
            providers={providers.map(p => ({
              id: p.id,
              name: p.user_profile?.full_name || 'Provider Name',
              specialization: p.specialization || 'Healthcare Provider',
              description: p.bio || "Experienced healthcare provider dedicated to patient care.",
              image: p.user_profile?.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
              rating: p.rating || 4.5,
              reviewCount: p.review_count || 0,
              address: p.clinic_address || '123 Medical Center, Downtown',
              distance: '2.5km', // Would need geolocation
              estimatedTime: '20 min', // Would need routing
              availability: 'Mon-Fri',
              hours: '9am - 5pm',
              yearsOfExperience: p.years_of_experience || 0,
              consultationFee: p.consultation_fee || 0
            }))}
            sortBy={sortBy}
            favorites={favorites}
            onSortChange={handleSortChange}
            onToggleFavorite={toggleFavorite}
            onProviderCardClick={handleProviderCardClick}
          />
        )}
      </div>
    </div>
  );
};