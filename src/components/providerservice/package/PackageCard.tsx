import React from 'react';
import { MessageSquare, Phone, Video, User } from 'lucide-react';
import { PackageOption } from './PackageSelectionPage';

interface PackageCardProps {
  package: PackageOption;
  duration: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  duration,
  isSelected,
  onSelect
}) => {
  const getIcon = () => {
    switch (pkg.type) {
      case 'messaging':
        return <MessageSquare className="w-6 h-6 text-blue-600" />;
      case 'voice':
        return <Phone className="w-6 h-6 text-blue-600" />;
      case 'video':
        return <Video className="w-6 h-6 text-blue-600" />;
      case 'in-person':
        return <User className="w-6 h-6 text-blue-600" />;
      default:
        return <MessageSquare className="w-6 h-6 text-blue-600" />;
    }
  };

  const getIconBg = () => {
    switch (pkg.type) {
      case 'messaging':
        return 'bg-blue-100';
      case 'voice':
        return 'bg-green-100';
      case 'video':
        return 'bg-purple-100';
      case 'in-person':
        return 'bg-orange-100';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full bg-white rounded-2xl p-4 shadow-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isSelected 
          ? 'border-blue-600 ring-2 ring-blue-100' 
          : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left Side - Icon and Info */}
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getIconBg()}`}>
            {getIcon()}
          </div>
          
          {/* Package Info */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {pkg.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {pkg.description}
            </p>
          </div>
        </div>

        {/* Right Side - Price and Radio */}
        <div className="flex items-center space-x-4">
          {/* Price */}
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              ${pkg.price}
            </div>
            <div className="text-sm text-gray-500">
              /{duration}mins
            </div>
          </div>
          
          {/* Radio Button */}
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isSelected 
              ? 'border-blue-600 bg-blue-600' 
              : 'border-gray-300'
          }`}>
            {isSelected && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};