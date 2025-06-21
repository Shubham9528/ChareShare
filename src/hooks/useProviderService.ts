import { useState } from 'react';
import { DetailedProvider } from '../types/provider';

interface PatientDetails {
  fullName: string;
  gender: string;
  age: number;
  problem: string;
}

interface AppointmentDetails {
  date: string;
  time: string;
  type: 'voice' | 'video' | 'message';
  location?: string;
}

export const useProviderService = (provider?: DetailedProvider) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('about');
  
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    fullName: '',
    gender: 'Male',
    age: 0,
    problem: ''
  });

  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
    date: '',
    time: '',
    type: 'video',
    location: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const updatePatientDetails = (field: keyof PatientDetails, value: string | number) => {
    setPatientDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAppointmentDetails = (field: keyof AppointmentDetails, value: string) => {
    setAppointmentDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleFollow = () => {
    setIsFollowing(prev => !prev);
  };

  const handleConfirmBooking = async (onSuccess?: () => void) => {
    try {
      // Here you would typically make an API call to book the appointment
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowConfirmation(true);
      onSuccess?.();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return {
    // States
    isFollowing,
    selectedTab,
    patientDetails,
    appointmentDetails,
    showConfirmation,

    // Setters
    setSelectedTab,
    setShowConfirmation,

    // Actions
    updatePatientDetails,
    updateAppointmentDetails,
    toggleFollow,
    handleConfirmBooking
  };
}; 