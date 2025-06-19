import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SettingsHeaderProps {
  onBack?: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
   
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
         
        </button>
        
        <h1 className="text-xl font-semibold text-gray-900">
          Profile
        </h1>
        
        {/* Empty div for spacing */}
        <div className="w-10"></div>
      </div>
    </header>
  );
};