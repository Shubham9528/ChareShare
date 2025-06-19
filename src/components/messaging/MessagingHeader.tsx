import React from 'react';
import { Search, Trash2 } from 'lucide-react';

interface MessagingHeaderProps {
  onBack?: () => void;
}

export const MessagingHeader: React.FC<MessagingHeaderProps> = ({ onBack }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Empty space for layout balance */}
        <div className="w-10"></div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900">
          Messages
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Search className="w-6 h-6 text-gray-700" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Trash2 className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};