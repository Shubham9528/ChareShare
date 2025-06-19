import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingScreen } from './OnboardingScreen';
import { onboardingSteps } from '../../data/onboardingSteps';

interface OnboardingFlowProps {
  onComplete?: () => void;
  onBackToWelcome?: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ 
  onComplete, 
  onBackToWelcome 
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = onboardingSteps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) {
        onComplete();
      } else {
        navigate('/login-selection');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // When skipping from first step, go back to welcome page
    if (currentStep === 1) {
      if (onBackToWelcome) {
        onBackToWelcome();
      } else {
        navigate('/');
      }
    } else {
      if (onComplete) {
        onComplete();
      } else {
        navigate('/login-selection');
      }
    }
  };

  const handleGetStarted = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate('/login-selection');
    }
  };

  const currentStepData = onboardingSteps[currentStep - 1];

  return (
    <OnboardingScreen
      step={currentStepData}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSkip={handleSkip}
      onGetStarted={handleGetStarted}
    />
  );
};