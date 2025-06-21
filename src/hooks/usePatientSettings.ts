import { useState } from 'react';

interface UserProfile {
  name: string;
  username: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  dateOfBirth?: string;
}

export const usePatientSettings = (initialProfile?: Partial<UserProfile>) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: initialProfile?.name || '',
    username: initialProfile?.username || '',
    age: initialProfile?.age || '',
    gender: initialProfile?.gender || 'Male',
    phone: initialProfile?.phone || '',
    email: initialProfile?.email || '',
    dateOfBirth: initialProfile?.dateOfBirth
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const updateField = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (onSuccess?: () => void) => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to update the profile
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess?.();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // States
    formData,
    isSubmitting,
    showLogoutPopup,

    // Setters
    setShowLogoutPopup,

    // Actions
    updateField,
    handleSubmit
  };
}; 