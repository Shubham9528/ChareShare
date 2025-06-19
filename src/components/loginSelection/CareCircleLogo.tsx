import React from 'react';

export const CareCircleLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Logo Icon - Much larger size with transparent background */}
      <div className="relative">
        <div className="w-50 h-50 flex items-center justify-center">
          <img
            src="/carecircle_logo.png"
            alt="CareCircle Logo - Medical heart with stethoscope"
            className="w-full h-full object-contain"
            style={{ backgroundColor: 'transparent' }}
            onError={(e) => {
              console.error('CareCircle logo failed to load');
              // Fallback to gradient background with heart icon if image fails
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                parent.style.borderRadius = '1rem';
                parent.innerHTML = `
                  <div class="w-16 h-16 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                `;
              }
            }}
          />
        </div>
      </div>
      
      {/* Logo Text */}
      <div className="text-center">
        {/* <h2 className="text-3xl font-bold text-blue-600">
          Care<span className="text-blue-800">Circle</span>
        </h2> */}
      </div>
    </div>
  );
};