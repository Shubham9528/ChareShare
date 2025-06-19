import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProviderServiceHeader } from './ProviderServiceHeader';
import { SearchFilters } from './SearchFilters';
import { ProviderResults } from './ProviderResults';
import { ProviderProfilePage } from './selectedproviderinfo/ProviderProfilePage';
import { mockProviders } from '../../data/mockProviders';
import { Provider } from '../../types/provider';
import { DetailedProvider } from '../../types/provider';

interface ProviderServicePageProps {
  onBack?: () => void;
  selectedProvider?: Provider;
  onNavigateToCategory?: () => void;
}

export type SortOption = 'default' | 'rating' | 'distance' | 'price';

export const ProviderServicePage: React.FC<ProviderServicePageProps> = ({ 
  onBack, 
  selectedProvider,
  onNavigateToCategory
}) => {
  const { category } = useParams<{ category: string }>();
  const [providerType, setProviderType] = useState(selectedProvider?.category || category || 'Dentist');
  const [location, setLocation] = useState('Toronto Ontario');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedDetailedProvider, setSelectedDetailedProvider] = useState<DetailedProvider | null>(null);

  // Check if we're on the selected profile route
  const isSelectedProfileRoute = window.location.pathname.includes('/selectedprofile');

  const handleProviderTypeChange = (type: string) => {
    setProviderType(type);
  };

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
  };

  const handleToggleFavorite = (providerId: string) => {
    setFavorites(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
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
    const providerToShow = selectedDetailedProvider || mockProviders[0];
    
    return (
      <ProviderProfilePage 
        provider={providerToShow}
        onBack={handleBackFromProfile}
        onNavigateToCategory={onNavigateToCategory}
      />
    );
  }

  // Filter and sort providers based on current selections
  const filteredProviders = mockProviders.filter(provider => 
    provider.specialization.toLowerCase().includes(providerType.toLowerCase())
  );

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'price':
        return a.consultationFee - b.consultationFee;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <ProviderServiceHeader onBack={handleBack} />

      {/* Content */}
      <div className="flex-1 px-4 py-6 pb-24">
        {/* Search Filters */}
        <SearchFilters
          providerType={providerType}
          location={location}
          onProviderTypeChange={handleProviderTypeChange}
          onLocationChange={handleLocationChange}
        />

        {/* Results */}
        <ProviderResults
          providers={sortedProviders}
          sortBy={sortBy}
          favorites={favorites}
          onSortChange={handleSortChange}
          onToggleFavorite={handleToggleFavorite}
          onProviderCardClick={handleProviderCardClick}
        />
      </div>
    </div>
  );
};