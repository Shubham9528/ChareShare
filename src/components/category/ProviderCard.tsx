import React from 'react';
import { Plus, Check } from 'lucide-react';
import { Provider } from '../../types/provider';

interface ProviderCardProps {
  provider: Provider;
  isSelected: boolean;
  onSelect: () => void;
  onCardClick?: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ 
  provider, 
  isSelected, 
  onSelect,
  onCardClick 
}) => {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    onSelect();
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 relative flex flex-col items-center justify-center text-center min-h-[140px] cursor-pointer hover:bg-gray-50`}
      style={isSelected ? { background: '#F2F2FF8C' } : {}}
    >
      {/* Custom SVG Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${provider.iconBg} mb-3`}>
        <div 
          className="w-6 h-6 flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: provider.svgIcon }}
        />
      </div>

      {/* Category Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {provider.category}
      </h3>

      {/* Provider Info */}
      <div className="mb-4">
        
      </div>

      {/* Button at Bottom Center */}
      
    </div>
  );
};