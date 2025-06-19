import React from 'react';

interface ActionButtonsProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onGetStarted, 
  onSignIn 
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8">
      <button 
        onClick={onGetStarted}
        className="w-full text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 text-sm sm:text-base"
        style={{
          background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
        }}
      >
        Let's Get Started
      </button>
      
      <p className="text-gray-600 text-sm sm:text-base">
        Already have an account?{' '}
        <button 
          onClick={onSignIn}
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline focus:outline-none focus:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};