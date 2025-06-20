import React from 'react';
import { Star, MapPin, Clock, Heart } from 'lucide-react';
import { DetailedProvider } from '../../types/provider';

interface ProviderCardProps {
  provider: DetailedProvider;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onCardClick?: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  isFavorite,
  onToggleFavorite,
  onCardClick
}) => {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Provider Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={provider.image}
          alt={`${provider.name} - ${provider.specialization}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center text-white">
                  <div class="text-center">
                    <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="font-semibold">${provider.name}</p>
                  </div>
                </div>
              `;
            }
          }}
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-900">
            {provider.rating} ({provider.reviewCount} reviews)
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Provider Info */}
      <div className="p-4 space-y-3">
        {/* Name and Specialization */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {provider.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {provider.specialization}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {provider.description}{' '}
          <button className="text-blue-600 font-medium hover:underline">
            Learn more
          </button>
        </p>

        {/* Address */}
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <span className="text-gray-600 text-sm">
            {provider.address}
          </span>
        </div>

        {/* Time and Availability */}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="text-gray-600 text-sm">
            {provider.estimatedTime}. {provider.distance}. {provider.availability} | {provider.hours}
          </span>
        </div>
      </div>
    </div>
  );
};