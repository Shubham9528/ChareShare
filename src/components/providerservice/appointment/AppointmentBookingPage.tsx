import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppointmentHeader } from './AppointmentHeader';
import { DoctorProfileCard } from './DoctorProfileCard';
import { AppointmentTypeCard } from './AppointmentTypeCard';
import { AddressSelection } from './AddressSelection';
import { DateTimeSelection } from './DateTimeSelection';
import { ConcernInput } from './ConcernInput';
import { DetailedProvider } from '../../../types/provider';
import { mockProviders } from '../../../data/mockProviders';

interface AppointmentBookingPageProps {
  onBack?: () => void;
  onNavigateToCategory?: () => void;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface DateSlot {
  date: string;
  day: string;
  dayName: string;
  slots: TimeSlot[];
  totalSlots: number;
}

export const AppointmentBookingPage: React.FC<AppointmentBookingPageProps> = ({ 
  onBack,
  onNavigateToCategory
}) => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  // Get provider data based on category or use first provider as fallback
  const provider = mockProviders.find(p => 
    p.specialization.toLowerCase() === category?.toLowerCase()
  ) || mockProviders[0];

  const [selectedAddress, setSelectedAddress] = useState<string>('1');
  const [selectedDate, setSelectedDate] = useState<string>('14');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [concern, setConcern] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // Generate date slots based on provider availability
  const dateSlots: DateSlot[] = [
    {
      date: '13',
      day: 'MON',
      dayName: 'Monday',
      slots: [],
      totalSlots: 0
    },
    {
      date: '14',
      day: 'TUE',
      dayName: 'Tuesday',
      slots: [
        { id: '1', time: '06:00 - 06:30', available: true },
        { id: '2', time: '06:30 - 07:00', available: true },
        { id: '3', time: '07:00 - 07:30', available: true }
      ],
      totalSlots: 20
    },
    {
      date: '15',
      day: 'WED',
      dayName: 'Wednesday',
      slots: [
        { id: '4', time: '07:00 - 07:25', available: true }
      ],
      totalSlots: 15
    },
    {
      date: '16',
      day: 'THU',
      dayName: 'Thursday',
      slots: [],
      totalSlots: 0
    }
  ];

  const handleMakeAppointment = () => {
    if (!selectedTime) {
      // Show alert for time selection
      setShowAlert(true);
      // Auto-hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    // Navigate to package selection page with the new route structure
    navigate(`/patient/providers/${category}/selectedprofile/selectappoinment/package`);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AppointmentHeader onBack={onBack} />

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-32">
        {/* Doctor Profile Card */}
        <DoctorProfileCard provider={provider} />

        {/* Appointment Type */}
        <AppointmentTypeCard fee={provider.consultationFee} />

        {/* Address Selection */}
        <AddressSelection
          provider={provider}
          selectedAddress={selectedAddress}
          onAddressChange={setSelectedAddress}
        />

        {/* Date & Time Selection */}
        <DateTimeSelection
          dateSlots={dateSlots}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateChange={setSelectedDate}
          onTimeChange={setSelectedTime}
        />

        {/* Concern Input */}
        <ConcernInput
          concern={concern}
          onConcernChange={setConcern}
        />
      </div>

      {/* Make Appointment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={handleMakeAppointment}
          className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200"
          style={{
            background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
          }}
        >
          Make an Appointment
        </button>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseAlert}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Alert Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>

            {/* Alert Title */}
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Time Slot Required
            </h3>

            {/* Alert Message */}
            <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
              Please select a time slot to proceed with your appointment booking.
            </p>

            {/* OK Button */}
            <button
              onClick={handleCloseAlert}
              className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-orange-200"
              style={{
                background: 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};