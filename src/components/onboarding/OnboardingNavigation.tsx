import React from 'react';
import { StepIndicator } from './StepIndicator';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onGetStarted: () => void;
}

export const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onGetStarted
}) => {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  const handleLeftButtonClick = () => {
    if (isFirstStep) {
      onSkip();
    } else {
      onPrevious();
    }
  };

  const handleRightButtonClick = () => {
    if (isLastStep) {
      onGetStarted();
    } else {
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      {/* Skip/Previous Button with Custom SVG */}
      <button
        onClick={handleLeftButtonClick}
        className="transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] focus:outline-none focus:ring-4 focus:ring-blue-200 rounded-full"
        type="button"
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="43.5" y="43.5" width="43" height="43" rx="21.5" transform="rotate(-180 43.5 43.5)" stroke="url(#paint0_linear_334_3636)"/>
          <g clipPath="url(#clip0_334_3636)">
            <path d="M32 22L12 22M12 22L21 31M12 22L21 13" stroke="url(#paint1_linear_334_3636)" strokeWidth="2"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear_334_3636" x1="66" y1="88" x2="66" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6"/>
              <stop offset="1" stopColor="#234C90"/>
            </linearGradient>
            <linearGradient id="paint1_linear_334_3636" x1="22" y1="13" x2="22" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6"/>
              <stop offset="1" stopColor="#234C90"/>
            </linearGradient>
            <clipPath id="clip0_334_3636">
              <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 34 34)"/>
            </clipPath>
          </defs>
        </svg>
      </button>

      {/* Step Indicator in the middle */}
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Next/Get Started Button with Custom SVG */}
      <button
        onClick={handleRightButtonClick}
        className="transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] focus:outline-none focus:ring-4 focus:ring-blue-200 rounded-full"
        type="button"
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="44" height="44" rx="22" fill="url(#paint0_linear_334_3643)"/>
          <path d="M12 22H32M32 22L23 13M32 22L23 31" stroke="white" strokeWidth="2"/>
          <defs>
            <linearGradient id="paint0_linear_334_3643" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6"/>
              <stop offset="1" stopColor="#234C90"/>
            </linearGradient>
          </defs>
        </svg>
      </button>
    </div>
  );
};