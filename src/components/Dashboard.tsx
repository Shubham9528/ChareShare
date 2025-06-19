import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    // Check if user came from Google OAuth and has a stored user type preference
    const storedUserType = localStorage.getItem('selectedUserType');
    console.log('Dashboard: Stored user type:', storedUserType);
    console.log('Dashboard: Profile user type:', profile?.user_type);
    
    if (storedUserType && user && profile) {
      console.log('Dashboard: Redirecting based on stored user type:', storedUserType);
      
      // If the stored preference is provider, redirect to provider page
      if (storedUserType === 'provider') {
        // Force redirect to provider page
        window.location.href = '/provider';
        return;
      }
      
      // Clear the stored preference after using it for patient
      if (storedUserType === 'patient') {
        localStorage.removeItem('selectedUserType');
      }
    }
    
    // Also check profile user_type for direct navigation
    if (profile?.user_type === 'provider') {
      console.log('Dashboard: Profile indicates provider, redirecting to /provider');
      window.location.href = '/provider';
      return;
    }
  }, [user, profile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Check user type and redirect accordingly
  if (profile?.user_type === 'provider') {
    return <Navigate to="/provider" replace />;
  }

  // Redirect patients to the patient category page
  return <Navigate to="/patient/category" replace />;
};