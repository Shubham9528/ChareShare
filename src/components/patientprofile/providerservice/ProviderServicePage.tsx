import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProviderServiceHeader } from './ProviderServiceHeader';
import { SearchFilters } from './SearchFilters';
import { ProviderResults } from './ProviderResults';
import { ProviderProfilePage } from './selectedproviderinfo/ProviderProfilePage';
import { useProviders } from '../../../hooks/useProviders';
import { DetailedProvider } from '../../../types/provider';

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
  const [selectedDetailedProvider, setSelectedDetailedProvider] = useState<DetailedProvider | null>(null);
  
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
    window.history.pushState({}, '', newUrl);
  };

  const handleBackFromProfile = () => {
    setSelectedDetailedProvider(null);
    // Update URL to go back to provider list
    const newUrl = window.location.pathname.replace('/selectedprofile', '');
    window.history.pushState({}, '', newUrl);
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
    
    if (!providerToShow) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading provider details...</p>
          </div>
        </div>
      );
    }
    
    return (
      <ProviderProfilePage 
        provider={{
          id: providerToShow.id,
          name: providerToShow.user_profile.full_name,
          specialization: providerToShow.specialization,
          description: providerToShow.bio || "Experienced healthcare provider dedicated to patient care.",
          image: providerToShow.user_profile.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
          rating: providerToShow.rating,
          reviewCount: providerToShow.review_count,
          address: providerToShow.clinic_address || '123 Medical Center, Downtown',
          distance: '2.5km', // Would need geolocation
          estimatedTime: '20 min', // Would need routing
          availability: 'Mon-Fri',
          hours: '9am - 5pm',
          yearsOfExperience: providerToShow.years_of_experience,
          consultationFee: providerToShow.consultation_fee
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
              name: p.user_profile.full_name,
              specialization: p.specialization,
              description: p.bio || "Experienced healthcare provider dedicated to patient care.",
              image: p.user_profile.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
              rating: p.rating,
              reviewCount: p.review_count,
              address: p.clinic_address || '123 Medical Center, Downtown',
              distance: '2.5km', // Would need geolocation
              estimatedTime: '20 min', // Would need routing
              availability: 'Mon-Fri',
              hours: '9am - 5pm',
              yearsOfExperience: p.years_of_experience,
              consultationFee: p.consultation_fee
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