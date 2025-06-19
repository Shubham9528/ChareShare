import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CareCircleLogo } from './CareCircleLogo';
import { LoginOptionCard } from './LoginOptionCard';
import { ProviderVerificationPopup } from './ProviderVerificationPopup';

interface LoginSelectionPageProps {
  onSelectUserType?: (userType: 'provider' | 'patient') => void;
}

export const LoginSelectionPage: React.FC<LoginSelectionPageProps> = ({ 
  onSelectUserType 
}) => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'provider' | 'patient' | null>(null);
  const [showProviderVerification, setShowProviderVerification] = useState(false);
  const [isProviderVerified, setIsProviderVerified] = useState(false);

  const handleCardClick = (userType: 'provider' | 'patient') => {
    if (userType === 'provider') {
      setShowProviderVerification(true);
      setSelectedType(userType);
    } else {
      setSelectedType(userType);
      setIsProviderVerified(false); // Reset provider verification for patient
    }
  };

  const handleProviderVerification = () => {
    setIsProviderVerified(true);
    // Don't close popup or redirect yet - wait for Get Started
  };

  const handleCloseVerification = () => {
    setShowProviderVerification(false);
    if (!isProviderVerified) {
      setSelectedType(null); // Reset selection if not verified
    }
  };

  const handleGetStarted = () => {
    if (selectedType === 'provider' && !isProviderVerified) {
      // Show verification popup if provider not verified
      setShowProviderVerification(true);
      return;
    }

    if (selectedType) {
      // Store the selected user type in localStorage for Google OAuth redirect
      console.log('LoginSelection: Storing user type:', selectedType);
      localStorage.setItem('selectedUserType', selectedType);
      
      // Redirect to auth page
      if (onSelectUserType) {
        onSelectUserType(selectedType);
      } else {
        navigate(`/auth?type=${selectedType}`);
      }
    } else {
      // If no selection made, default to patient
      console.log('LoginSelection: No selection, defaulting to patient');
      localStorage.setItem('selectedUserType', 'patient');
      if (onSelectUserType) {
        onSelectUserType('patient');
      } else {
        navigate('/auth?type=patient');
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: '#FFFFFF' }}>
        <div className="max-w-sm w-full space-y-8">
          {/* Logo */}
          <div className="text-center space-y-4">
            <CareCircleLogo />
            <h1 className="text-2xl font-bold text-gray-900">
              How do you want to login as?
            </h1>
          </div>

          {/* Login Options with adjusted positioning */}
          <div className="space-y-4">
            {/* Patient button - moved up with negative margin */}
            <div className="-mt-2">
              <LoginOptionCard
                type="patient"
                title="As a Patient"
                description="Log in to book appointments, track your treatments, and stay connected with your care provider."
                image="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400"
                imageAlt="Patient in hospital setting"
                onClick={() => handleCardClick('patient')}
                isSelected={selectedType === 'patient'}
              />
            </div>

            {/* Provider button - moved down with positive margin */}
            <div className="mt-6">
              <LoginOptionCard
                type="provider"
                title="As a Provider"
                description="Log in to manage your schedule, connect with patients, and grow your practice."
                image="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400"
                imageAlt="Professional doctor in white coat with stethoscope"
                onClick={() => handleCardClick('provider')}
                isSelected={selectedType === 'provider'}
              />
              {/* Verification Status Indicator */}
              {selectedType === 'provider' && isProviderVerified && (
                <div className="mt-2 flex items-center justify-center space-x-2 text-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Verified</span>
                </div>
              )}
            </div>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            className={`w-full font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 ${
              selectedType 
                ? 'text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={selectedType ? {
              background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
            } : {}}
            disabled={!selectedType}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Provider Verification Popup */}
      <ProviderVerificationPopup
        isOpen={showProviderVerification}
        onClose={handleCloseVerification}
        onVerify={handleProviderVerification}
      />
    </>
  );
};