import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const AuthCallback: React.FC = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Handle the auth callback
    const handleAuthCallback = async () => {
      // The auth state change will be handled by the AuthProvider
      // Just wait for the user to be authenticated
      if (user && !loading) {
        // Redirect will be handled by the main App component
        window.location.href = '/';
      }
    };

    handleAuthCallback();
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Completing sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};