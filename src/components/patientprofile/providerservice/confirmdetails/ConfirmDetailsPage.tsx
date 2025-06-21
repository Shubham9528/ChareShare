import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ConfirmDetailsHeader } from './ConfirmDetailsHeader';
import { DoctorSummaryCard } from './DoctorSummaryCard';
import { PatientDetailsSection } from './PatientDetailsSection';
import { ScheduledAppointmentSection } from './ScheduledAppointmentSection';
import { AmountAppointmentSection } from './AmountAppointmentSection';
import { BookingConfirmPopup } from '../confirmpopup/BookingConfirmPopup';
import { DetailedProvider } from '../../../../types/provider';
import { PackageOption } from '../package/PackageSelectionPage';
import { mockProviders } from '../../../../data/mockProviders';
import { useBookingFlow } from '../../../../hooks/useBookingFlow';

export interface PatientDetails {
  fullName: string;
  gender: string;
  age: number;
  problem: string;
}

interface ConfirmDetailsPageProps {
  onBack: () => void;
}

export const ConfirmDetailsPage: React.FC<ConfirmDetailsPageProps> = ({ onBack }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const {
    selectedProvider,
    selectedPackage,
    duration,
    appointmentDate,
    appointmentTime,
    patientConcern,
    selectedAddress,
    resetBookingFlow,
    isBookingComplete
  } = useBookingFlow();
  
  React.useEffect(() => {
    // Redirect if booking data is incomplete
    if (!isBookingComplete()) {
      navigate('/patient/category');
    }
  }, [isBookingComplete, navigate]);

  // If we don't have complete booking data, don't render the page
  if (!selectedPackage || !selectedProvider) {
    return null;
  }

  // Get data from location state or use fallbacks
  const stateData = location.state || {};
  const provider = selectedProvider || mockProviders.find(p => 
    p.specialization.toLowerCase() === category?.toLowerCase()
  ) || mockProviders[0];
  
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  
  // Mock patient data - in a real app, this would come from user profile
  const patientDetails: PatientDetails = {
    fullName: 'Esther Howard',
    gender: 'Male',
    age: 26,
    problem: patientConcern
  };

  // Format appointment date
  const formatAppointmentDate = (dateStr: string) => {
    // Convert date string to proper format
    const currentYear = new Date().getFullYear();
    const date = new Date(`${currentYear}-05-${dateStr}`);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  // Generate booking ID
  const generateBookingId = () => {
    return `20231104`;
  };

  const handleBookNow = () => {
    const bookingData = {
      provider: provider.name,
      patient: patientDetails,
      appointment: {
        date: appointmentDate,
        time: appointmentTime,
        duration: duration,
        type: selectedPackage?.title
      },
      payment: {
        method: paymentMethod,
        amount: selectedPackage?.price || 0,
        total: selectedPackage?.price || 0
      }
    };

    console.log('Booking confirmed:', bookingData);
    setShowConfirmPopup(true);
  };

  const handleBack = () => {
    onBack();
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false);
  };

  const handleDoneFromPopup = () => {
    setShowConfirmPopup(false);
    resetBookingFlow();
    navigate('/patient/category');
  };

  const confirmPopupData = {
    bookingId: generateBookingId(),
    doctorName: provider.name,
    doctorImage: provider.image,
    date: appointmentDate,
    time: appointmentTime
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <ConfirmDetailsHeader onBack={handleBack} />

        {/* Content */}
        <div className="px-4 py-6 space-y-6 pb-32">
          {/* Doctor Summary Card */}
          <DoctorSummaryCard 
            provider={provider}
            duration={duration}
          />

          {/* Patient Details */}
          <PatientDetailsSection 
            patientDetails={patientDetails}
          />

          {/* Scheduled Appointment */}
          <ScheduledAppointmentSection
            appointmentData={{
              date: formatAppointmentDate(appointmentDate),
              time: appointmentTime,
              duration: duration,
              problem: patientDetails.problem
            }}
          />

          {/* Amount Details */}
          <AmountAppointmentSection
            selectedPackage={selectedPackage}
            duration={duration}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </div>

        {/* Book Now Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleBookNow}
            className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200"
            style={{
              background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Confirmation Popup */}
      <BookingConfirmPopup
        isOpen={showConfirmPopup}
        onClose={handleClosePopup}
        onDone={handleDoneFromPopup}
        bookingData={confirmPopupData}
      />
    </>
  );
};