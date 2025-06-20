import React from 'react';
import { Edit, Plus } from 'lucide-react';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onAdd?: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  title, 
  children, 
  onEdit, 
  onAdd 
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        
        <div className="flex items-center space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Edit className="w-4 h-4 text-blue-600" />
            </button>
          )}
          
          {onAdd && (
            <button
              onClick={onAdd}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 text-blue-600" />
            </button>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div>{children}</div>
    </div>
  );
};