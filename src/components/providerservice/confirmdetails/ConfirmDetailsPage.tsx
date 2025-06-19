import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ConfirmDetailsHeader } from './ConfirmDetailsHeader';
import { DoctorSummaryCard } from './DoctorSummaryCard';
import { PatientDetailsSection } from './PatientDetailsSection';
import { ScheduledAppointmentSection } from './ScheduledAppointmentSection';
import { AmountAppointmentSection } from './AmountAppointmentSection';
import { BookingConfirmPopup } from '../confirmpopup/BookingConfirmPopup';
import { DetailedProvider } from '../../../types/provider';
import { PackageOption } from '../package/PackageSelectionPage';
import { mockProviders } from '../../../data/mockProviders';

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
  
  // Get data from location state or use fallbacks
  const stateData = location.state || {};
  const provider: DetailedProvider = stateData.provider || mockProviders.find(p => 
    p.specialization.toLowerCase() === category?.toLowerCase()
  ) || mockProviders[0];
  
  const selectedPackage: PackageOption = stateData.selectedPackage || {
    id: 'messaging',
    type: 'messaging',
    title: 'Messaging',
    description: 'Chat with Doctor',
    price: 20,
    icon: '💬'
  };
  
  const duration: number = stateData.duration || 30;
  const appointmentData = stateData.appointmentData || {
    date: '14',
    time: '06:30 - 07:00',
    concern: 'Lorem Isum dolor',
    address: '1'
  };

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  
  // Mock patient data - in a real app, this would come from user profile
  const patientDetails: PatientDetails = {
    fullName: 'Esther Howard',
    gender: 'Male',
    age: 26,
    problem: appointmentData.concern || 'Lorem Isum dolor'
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
        date: formatAppointmentDate(appointmentData.date),
        time: appointmentData.time,
        duration: duration,
        type: selectedPackage.title
      },
      payment: {
        method: paymentMethod,
        amount: selectedPackage.price,
        total: selectedPackage.price
      }
    };

    console.log('Booking confirmed:', bookingData);
    
    // Show confirmation popup without any alerts
    setShowConfirmPopup(true);
  };

  const handleBack = () => {
    onBack();
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false);
  };

  const handleDoneFromPopup = () => {
    // Close the popup first
    setShowConfirmPopup(false);
    
    // Navigate directly to patient category page
    navigate('/patient/category');
  };

  const confirmPopupData = {
    bookingId: generateBookingId(),
    doctorName: provider.name,
    doctorImage: provider.image,
    date: formatAppointmentDate(appointmentData.date),
    time: appointmentData.time
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
              date: formatAppointmentDate(appointmentData.date),
              time: appointmentData.time,
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