import React from 'react';
import { ChevronRight, X } from 'lucide-react';

interface MedicalItemProps {
  icon: string;
  name: string;
  dosage?: string;
  severity?: string;
  type?: string;
  showChevron?: boolean;
  onDelete?: () => void;
}

export const MedicalItem: React.FC<MedicalItemProps> = ({ 
  icon, 
  name, 
  dosage, 
  severity, 
  type,
  showChevron = false,
  onDelete
}) => {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'severe':
        return 'text-red-600 bg-red-50';
      case 'moderate':
        return 'text-orange-600 bg-orange-50';
      case 'mild':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
        {icon}
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        {dosage && (
          <p className="text-sm text-gray-600">{dosage}</p>
        )}
        {severity && (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getSeverityColor(severity)}`}>
            {severity}
          </span>
        )}
        {type && (
          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 bg-blue-50 text-blue-600">
            {type}
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {showChevron && (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
        
        {onDelete && (
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};