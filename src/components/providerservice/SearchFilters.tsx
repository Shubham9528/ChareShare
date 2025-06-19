import React from 'react';
import { Search, MapPin, Settings } from 'lucide-react';

interface SearchFiltersProps {
  providerType: string;
  location: string;
  onProviderTypeChange: (type: string) => void;
  onLocationChange: (location: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  providerType,
  location,
  onProviderTypeChange,
  onLocationChange
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Provider Type Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={providerType}
          onChange={(e) => onProviderTypeChange(e.target.value)}
          placeholder="Search provider type..."
          className="w-full pl-12 pr-12 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Location Search */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Enter location..."
          className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
        />
      </div>
    </div>
  );
};