import React from 'react';

interface AppointmentTypeCardProps {
  fee: number;
}

export const AppointmentTypeCard: React.FC<AppointmentTypeCardProps> = ({ fee }) => {
  return (
    <div 
      className="rounded-2xl p-4 text-white"
      style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">In-Clinic Appointment</span>
        <span className="text-xl font-bold">₹{fee.toLocaleString()}</span>
      </div>
    </div>
  );
};