import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress 
}) => {
  return (
    <button
      onClick={onPress}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
    >
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
          {icon}
        </div>
        
        {/* Content */}
        <div className="text-left">
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
      </div>
      
      {/* Chevron */}
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
};