import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ConfirmDetailsHeaderProps {
  onBack?: () => void;
}

export const ConfirmDetailsHeader: React.FC<ConfirmDetailsHeaderProps> = ({ onBack }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900">
          Appointment Details
        </h1>

        {/* Empty space for balance */}
        <div className="w-10"></div>
      </div>
    </header>
  );
};