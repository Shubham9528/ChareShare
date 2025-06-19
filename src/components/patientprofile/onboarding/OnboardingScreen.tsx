import React from 'react';
import { OnboardingStep } from '../../types';
import { OnboardingImage } from './OnboardingImage';
import { OnboardingContent } from './OnboardingContent';
import { OnboardingNavigation } from './OnboardingNavigation';

interface OnboardingScreenProps {
  step: OnboardingStep;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onGetStarted: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onGetStarted
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: '#FFFFFF' }}>
      <div className="max-w-md w-full space-y-8 flex flex-col justify-between min-h-[80vh]">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Image */}
          <div className="relative">
            <OnboardingImage 
              src={step.image}
              alt={step.imageAlt}
              className="w-full h-80 mx-auto"
            />
          </div>

          {/* Content */}
          <OnboardingContent step={step} />
        </div>

        {/* Navigation with integrated step indicator */}
        <div className="pt-8">
          <OnboardingNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={onNext}
            onPrevious={onPrevious}
            onSkip={onSkip}
            onGetStarted={onGetStarted}
          />
        </div>
      </div>
    </div>
  );
};