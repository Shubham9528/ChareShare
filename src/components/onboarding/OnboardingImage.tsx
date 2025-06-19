import React from 'react';

interface OnboardingImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OnboardingImage: React.FC<OnboardingImageProps> = ({ 
  src, 
  alt, 
  className = "" 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl opacity-20"></div>
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-3xl shadow-2xl"
        onError={(e) => {
          console.error('Onboarding image failed to load:', e);
          // Fallback to a solid color background
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.style.background = 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)';
          }
        }}
      />
    </div>
  );
};