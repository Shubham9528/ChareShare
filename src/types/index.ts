export interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface NavigationState {
  currentPage: 'welcome' | 'onboarding' | 'loginSelection' | 'auth';
  currentStep?: number;
  userType?: 'provider' | 'patient';
}