import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundIcons } from './BackgroundIcons';
import { WelcomeContent } from './WelcomeContent';
import { ActionButtons } from './ActionButtons';

interface WelcomePageProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ 
  onGetStarted, 
  onSignIn 
}) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate('/onboarding');
    }
  };

  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
    } else {
      navigate('/login-selection');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      <BackgroundIcons />
      
      <div className="max-w-xs sm:max-w-md md:max-w-lg w-full space-y-6 sm:space-y-8 text-center relative z-10">
        {/* Medical Illustration */}
        <div className="relative mb-8 md:mb-12">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto relative flex items-center justify-center">
            <img 
              src="/DoctorIllustration.png" 
              alt="Medical professionals illustration showing three healthcare workers - a nurse, doctor, and medical professional with stethoscopes and medical equipment"
              className="w-full h-auto object-contain max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-72"
              style={{ backgroundColor: 'transparent' }}
              onError={(e) => {
                console.error('Image failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Image loaded successfully');
              }}
            />
          </div>
        </div>

        <WelcomeContent />
        <ActionButtons 
          onGetStarted={handleGetStarted}
          onSignIn={handleSignIn}
        />
      </div>
    </div>
  );
};