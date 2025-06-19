import React from 'react';

interface Booking {
  id: string;
  bookingNumber: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Status Badge */}
      <div className="flex justify-end mb-3">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </div>
      </div>

      {/* Patient Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={booking.patientAvatar}
            alt={booking.patientName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                    ${booking.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                `;
              }
            }}
          />
        </div>

        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">
            {booking.bookingNumber}
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {booking.patientName}
          </h3>
          <p className="text-gray-600 text-sm">
            {booking.date} - {booking.time}
          </p>
        </div>
      </div>
    </div>
  );
};