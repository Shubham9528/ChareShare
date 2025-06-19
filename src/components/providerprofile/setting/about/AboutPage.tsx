import React from 'react';
import { ArrowLeft, ChevronRight, Heart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/provider/setting');
  };

  const handleItemClick = (item: string) => {
    console.log(`Navigate to ${item}`);
    // Implement navigation to specific items
  };

  const aboutItems = [
    { id: 'accessibility', title: 'Accessibility' },
    { id: 'terms', title: 'Terms of Use' },
    { id: 'lorem1', title: 'Lorem Ipsum' },
    { id: 'feedback', title: 'Feedback' },
    { id: 'rate', title: 'Rate us' },
    { id: 'lorem2', title: 'Lorem Ipsum' },
    { id: 'website', title: 'Visit Our Website' },
    { id: 'lorem3', title: 'Lorem Ipsum' },
    { id: 'social', title: 'Follow us on Social Media' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-900">
            About CareCircle
          </h1>
          
          {/* Empty div for spacing */}
          <div className="w-10"></div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {/* Logo and Version Section */}
        <div className="flex flex-col items-center mb-8 py-8">
          {/* Logo - Heart with Medical Cross */}
          <div className="w-24 h-24 mb-6 relative">
            <div className="w-full h-full flex items-center justify-center">
              {/* Heart Shape with Medical Cross */}
              <div className="relative">
                <Heart className="w-20 h-20 text-blue-500 fill-current" />
                {/* Medical Cross */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Plus className="w-8 h-8 text-blue-600" strokeWidth={3} />
                </div>
                {/* Stethoscope curve */}
                <div className="absolute -bottom-2 -right-1">
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2C2 2 8 8 12 8C16 8 22 2 22 2" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="22" cy="2" r="2" fill="#3B82F6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Version */}
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            CareCircle V00.01
          </h2>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          {aboutItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-lg font-medium text-gray-900">
                {item.title}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};