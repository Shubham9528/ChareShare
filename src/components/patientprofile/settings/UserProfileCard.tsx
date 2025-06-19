import React from 'react';
import { ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../lib/supabase';

interface UserProfileCardProps {
  user?: UserProfile | null;
  onEdit?: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onEdit }) => {
  const navigate = useNavigate();
  
  // Generate a mock phone number if not available
  const displayPhone = user?.phone || '+1(234)567-0435';
  
  const handleEdit = () => {
    navigate('/patient/profile/setting/editprofile');
  };
  
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <button
        onClick={handleEdit}
        className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl p-2"
      >
        <div className="flex items-center space-x-4">
          {/* Profile Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          
          {/* User Info */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">
              {user?.full_name || 'John Worky'}
            </h3>
            <p className="text-sm text-gray-600">
              {displayPhone}
            </p>
          </div>
        </div>
        
        {/* Chevron */}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
};