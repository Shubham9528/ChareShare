import React from 'react';
import { DetailedProvider } from '../../../types/provider';

interface ProviderProfileInfoProps {
  provider: DetailedProvider;
  isFollowing: boolean;
  onFollow: () => void;
  onMessage: () => void;
}

export const ProviderProfileInfo: React.FC<ProviderProfileInfoProps> = ({
  provider,
  isFollowing,
  onFollow,
  onMessage
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Profile Picture and Basic Info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center text-white font-semibold text-lg">
                    ${provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                `;
              }
            }}
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {provider.name}
          </h2>
          <p className="text-gray-600 mb-1">
            {provider.specialization}
          </p>
          <p className="text-gray-500 text-sm">
            +{provider.yearsOfExperience} Year Experience
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around mb-6 py-4 border-t border-b border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">275</div>
          <div className="text-gray-600 text-sm">Articles</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">234</div>
          <div className="text-gray-600 text-sm">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{provider.rating}</div>
          <div className="text-gray-600 text-sm">Reviews</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onFollow}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFollowing
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
              : 'text-white hover:opacity-90 focus:ring-blue-500'
          }`}
          style={!isFollowing ? {
            background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
          } : {}}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        
        <button
          onClick={onMessage}
          className="flex-1 py-3 px-6 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Message
        </button>
      </div>
    </div>
  );
};