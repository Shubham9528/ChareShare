import React from 'react';
import { OnboardingStep } from '../../types';

interface OnboardingContentProps {
  step: OnboardingStep;
}

export const OnboardingContent: React.FC<OnboardingContentProps> = ({ step }) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
        {step.title}{' '}
        <span className="text-blue-600">{step.subtitle}</span>
      </h1>
      
      <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto px-4">
        {step.description}
      </p>
    </div>
  );
};