import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200 z-40"
      style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
      }}
    >
      <Plus className="w-6 h-6 mx-auto" />
    </button>
  );
};