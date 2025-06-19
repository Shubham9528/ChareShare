import React from 'react';
import { Star, Clock } from 'lucide-react';
import { DetailedProvider } from '../../../types/provider';

interface DoctorSummaryCardProps {
  provider: DetailedProvider;
  duration: number;
}

export const DoctorSummaryCard: React.FC<DoctorSummaryCardProps> = ({
  provider,
  duration
}) => {
  return (
    <div 
      className="rounded-2xl p-4 text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
      }}
    >
      <div className="flex items-center space-x-4">
        {/* Doctor Image */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white bg-opacity-20">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                    ${provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                `;
              }
            }}
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-white">
              {provider.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <span className="text-white font-medium">{provider.rating}</span>
            </div>
          </div>
          
          <p className="text-blue-100 mb-2">
            {provider.specialization}
          </p>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-200" />
            <span className="text-blue-100 text-sm">
              {duration === 60 ? '1 hour' : `${duration} minute`} consultation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};