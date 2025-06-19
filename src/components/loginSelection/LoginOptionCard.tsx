import React from 'react';
import { ChevronRight } from 'lucide-react';

interface LoginOptionCardProps {
  type: 'provider' | 'patient';
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  onClick: () => void;
  isSelected?: boolean;
}

export const LoginOptionCard: React.FC<LoginOptionCardProps> = ({
  type,
  title,
  description,
  image,
  imageAlt,
  onClick,
  isSelected = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl p-4 shadow-sm border transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 text-left ${
        isSelected 
          ? 'text-white' 
          : 'bg-white border-gray-100 hover:shadow-md hover:border-blue-200'
      }`}
      style={isSelected ? { background: '#FFFFFF' } : {}}
    >
      <div className="flex items-center space-x-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={type === 'patient' ? '/as-a-patient-img.png' : '/as-a-provider-img.png'}
              alt={imageAlt}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient background if image fails
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.style.background = type === 'provider' 
                    ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
                    : 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)';
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center">
                      <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <span class="text-white text-sm font-bold">${type === 'provider' ? 'Dr' : 'P'}</span>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-1 ${
            isSelected ? 'text-gray-900' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${
            isSelected ? 'text-gray-600' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <ChevronRight className={`w-5 h-5 ${
            isSelected ? 'text-gray-400' : 'text-gray-400'
          }`} />
        </div>
      </div>
    </button>
  );
};