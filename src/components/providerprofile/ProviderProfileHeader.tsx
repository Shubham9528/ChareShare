import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProviderProfileHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleMenu = () => {
    navigate('/provider/setting');
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Empty space for layout balance */}
        <div className="w-10"></div>

        {/* Title - Center */}
        <h1 className="text-lg font-semibold text-gray-900">
          Profile Page
        </h1>

        {/* Menu Button - Right */}
        <button
          onClick={handleMenu}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
};