import React from 'react';

interface ScheduledAppointmentSectionProps {
  appointmentData: {
    date: string;
    time: string;
    duration: number;
    problem: string;
  };
}

export const ScheduledAppointmentSection: React.FC<ScheduledAppointmentSectionProps> = ({
  appointmentData
}) => {
  const formatTimeSlot = (timeStr: string, duration: number) => {
    if (timeStr.includes(' - ')) {
      return `${timeStr} (${duration} mint)`;
    }
    
    // If time doesn't have end time, calculate it
    const [startTime] = timeStr.split(' - ');
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = Math.floor((minutes + duration) / 60) + hours;
    const endMinutes = (minutes + duration) % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    
    return `${startTime} - ${endTime} (${duration} mint)`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Scheduled Appointment
      </h3>
      
      <div className="space-y-4">
        {/* Date */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Date</span>
          <span className="font-medium text-gray-900">{appointmentData.date}</span>
        </div>

        {/* Time */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Time</span>
          <span className="font-medium text-gray-900">
            {formatTimeSlot(appointmentData.time, appointmentData.duration)}
          </span>
        </div>

        {/* Booking for */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Booking for</span>
          <span className="font-medium text-gray-900">Self</span>
        </div>

        {/* Problem */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Problem</span>
          <span className="font-medium text-gray-900">{appointmentData.problem}</span>
        </div>
      </div>
    </div>
  );
};