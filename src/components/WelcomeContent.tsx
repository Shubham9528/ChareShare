import React from 'react';

export const WelcomeContent: React.FC = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
        Your <span className="text-blue-600">Ultimate Doctor</span> Appointment
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>
        Booking App
      </h1>
      
      <p className="text-gray-600 text-base sm:text-lg leading-relaxed px-2 sm:px-0">
        Book appointments effortlessly and manage your health journey.
      </p>
    </div>
  );
};