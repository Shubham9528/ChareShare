import React from 'react';
import { ChevronRight, X } from 'lucide-react';

export interface MedicalItemProps {
  icon: string;
  name: string;
  severity?: string;
  dosage?: string;
  frequency?: string;
  type?: string;
  date?: string;
  onDelete: () => void;
}

export const MedicalItem: React.FC<MedicalItemProps> = ({
  icon,
  name,
  severity,
  dosage,
  frequency,
  type,
  date,
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
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-lg">{icon}</span>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          {severity && (
            <p className="text-sm text-gray-600">Severity: {severity}</p>
          )}
          {dosage && (
            <p className="text-sm text-gray-600">Dosage: {dosage}</p>
          )}
          {frequency && (
            <p className="text-sm text-gray-600">Frequency: {frequency}</p>
          )}
          {type && (
            <p className="text-sm text-gray-600">Type: {type}</p>
          )}
          {date && (
            <p className="text-sm text-gray-600">Date: {date}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};