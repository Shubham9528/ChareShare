import React from 'react';
import { User, X } from 'lucide-react';

interface EmergencyContactProps {
  contact: {
    id: string;
    name: string;
    relationship: string;
    phone: string;
  };
  onDelete?: () => void;
}

export const EmergencyContact: React.FC<EmergencyContactProps> = ({ contact, onDelete }) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <User className="w-5 h-5 text-blue-600" />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
        <p className="text-sm text-gray-600">{contact.relationship} • {contact.phone}</p>
      </div>

      {onDelete && (
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};