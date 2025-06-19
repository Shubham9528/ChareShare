import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ProviderCard } from './ProviderCard';
import { DetailedProvider } from '../../types/provider';
import { SortOption } from './ProviderServicePage';

interface ProviderResultsProps {
  providers: DetailedProvider[];
  sortBy: SortOption;
  favorites: string[];
  onSortChange: (sort: SortOption) => void;
  onToggleFavorite: (providerId: string) => void;
  onProviderCardClick?: (provider: DetailedProvider) => void;
}

export const ProviderResults: React.FC<ProviderResultsProps> = ({
  providers,
  sortBy,
  favorites,
  onSortChange,
  onToggleFavorite,
  onProviderCardClick
}) => {
  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'rating':
        return 'Rating';
      case 'distance':
        return 'Distance';
      case 'price':
        return 'Price';
      default:
        return 'Default';
    }
  };

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {providers.length} Provider{providers.length !== 1 ? 's' : ''}
        </h2>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="rating">Rating</option>
            <option value="distance">Distance</option>
            <option value="price">Price</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Provider Cards */}
      <div className="space-y-4">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            isFavorite={favorites.includes(provider.id)}
            onToggleFavorite={() => onToggleFavorite(provider.id)}
            onCardClick={() => onProviderCardClick?.(provider)}
          />
        ))}
      </div>

      {/* No Results */}
      {providers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No providers found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
};