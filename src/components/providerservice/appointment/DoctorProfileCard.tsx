import React from 'react';
import { DetailedProvider } from '../../../types/provider';

interface DoctorProfileCardProps {
  provider: DetailedProvider;
}

export const DoctorProfileCard: React.FC<DoctorProfileCardProps> = ({ provider }) => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden">
        <img
          src={provider.image}
          alt={`${provider.name} - ${provider.specialization}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center">
                  <div class="text-center text-gray-500">
                    <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="font-medium">Doctor Image</p>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>

      {/* Doctor Info Card */}
      <div 
        className="absolute bottom-4 left-4 right-4 rounded-2xl p-4 text-white"
        style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
        }}
      >
        <h2 className="text-xl font-bold mb-1">{provider.name}</h2>
        <p className="text-blue-100 mb-1">Senior {provider.specialization}</p>
        <p className="text-blue-100 text-sm">{provider.address.split(',')[0]} Medical Center</p>
      </div>
    </div>
  );
}