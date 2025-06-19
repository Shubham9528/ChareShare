import React from 'react';
import { LogOut } from 'lucide-react';

interface LogoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const LogoutPopup: React.FC<LogoutPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white rounded-t-3xl px-6 py-8 mx-4 mb-4 shadow-2xl">
          {/* Handle Bar */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-8"></div>
          
          {/* Logout Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="w-10 h-10 text-red-600" />
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Logout
          </h2>
          
          {/* Message */}
          <p className="text-gray-600 text-center mb-8 text-lg">
            Are you sure you want to log out?
          </p>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-4 px-6 border-2 border-blue-500 text-blue-500 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            
            {/* Confirm Button */}
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-4 px-6 text-white font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              style={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              {isLoading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{isLoading ? 'Logging out...' : 'Yes, Logout'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};