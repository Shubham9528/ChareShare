import { OnboardingStep } from '../types';

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Discover",
    subtitle: "Experienced Doctors",
    description: "Connect with qualified healthcare professionals who are ready to provide you with the best medical care and consultation.",
    image: "/welcomeImg-1.png",
    imageAlt: "Three healthcare professionals - a female doctor, male doctor with glasses, and male nurse with stethoscopes and medical equipment"
  },
  {
    id: 2,
    title: "Book",
    subtitle: "Appointments Easily",
    description: "Schedule your medical appointments with just a few taps. Choose your preferred time, date, and healthcare provider effortlessly.",
    image: "/welcomeImg-2.png",
    imageAlt: "Patient consulting with doctor through telemedicine on mobile device"
  },
  {
    id: 3,
    title: "Manage",
    subtitle: "Your Health Journey",
    description: "Keep track of your medical history, prescriptions, and upcoming appointments all in one secure, easy-to-use platform.",
    image: "/welcomeImg-3.png",
    imageAlt: "Doctor examining X-ray results in modern medical clinic"
  }
];