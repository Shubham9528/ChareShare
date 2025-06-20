import React from 'react';
import { Check, X } from 'lucide-react';

interface BookingConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDone?: () => void; // Add onDone prop for custom navigation
  bookingData: {
    bookingId: string;
    doctorName: string;
    doctorImage: string;
    date: string;
    time: string;
  };
}

export const BookingConfirmPopup: React.FC<BookingConfirmPopupProps> = ({
  isOpen,
  onClose,
  onDone,
  bookingData
}) => {
  if (!isOpen) return null;

  const handleDoneClick = () => {
    // Close the popup first
    onClose();
    
    // If onDone callback is provided, use it for navigation
    if (onDone) {
      onDone();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
            }}
          >
            <Check className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          Booking Confirmed!
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
          The booking confirmation has been sent to your Email Address
        </p>

        {/* Booking ID */}
        <div className="text-center mb-6">
          <span className="text-blue-600 font-semibold">
            Booking ID - {bookingData.bookingId}
          </span>
        </div>

        {/* Doctor Info */}
        <div className="flex flex-col items-center mb-6">
          {/* Doctor Image */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-200 mb-3">
            <img
              src={bookingData.doctorImage}
              alt={bookingData.doctorName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                      ${bookingData.doctorName.split(' ').map(n => n[0]).join('')}
                    </div>
                  `;
                }
              }}
            />
          </div>

          {/* Doctor Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {bookingData.doctorName}
          </h3>
        </div>

        {/* Appointment Details */}
        <div className="space-y-3 mb-8">
          {/* Date */}
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{bookingData.date}</span>
          </div>

          {/* Time */}
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{bookingData.time}</span>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={handleDoneClick}
          className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200"
          style={{
            background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};