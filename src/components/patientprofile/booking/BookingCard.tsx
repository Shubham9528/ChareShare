import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { Booking } from '../../types/booking';
import { AddReviewPopup } from './AddReviewPopup';

interface BookingCardProps {
  booking: Booking;
  onCancel: (bookingId: string) => void;
  onReschedule: (bookingId: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ 
  booking, 
  onCancel, 
  onReschedule 
}) => {
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

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

  const handleAddReview = (bookingId: string) => {
    console.log('Add review for booking:', bookingId);
    setShowReviewPopup(true);
  };

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    console.log('Review submitted:', review);
    // Implement review submission logic here
    setShowReviewPopup(false);
  };

  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        {/* Date and Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {formatDate(booking.date)} - {formatTime(booking.time)}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img
              src={booking.doctor.avatar}
              alt={booking.doctor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                      ${booking.doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  `;
                }
              }}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{booking.doctor.name}</h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{booking.doctor.rating}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{booking.doctor.specialization}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{booking.location}</span>
        </div>

        {/* Action Buttons */}
        {booking.status === 'upcoming' && (
          <div className="flex space-x-3">
            <button
              onClick={() => onCancel(booking.id)}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={() => onReschedule(booking.id)}
              className="flex-1 py-2 px-4 text-white font-medium rounded-xl hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              Reschedule
            </button>
          </div>
        )}

        {booking.status === 'completed' && (
          <div className="flex space-x-3">
            <button 
              className="flex-1 py-2 px-4 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              style={{
                background: '#FFFFFF'
              }}
            >
              Re-Book
            </button>
            <button 
              onClick={() => handleAddReview(booking.id)}
              className="flex-1 py-2 px-4 text-white font-medium rounded-xl hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
              style={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              <Star className="w-4 h-4" />
              <span>Add Review</span>
            </button>
          </div>
        )}

        {booking.status === 'cancelled' && (
          <div className="flex justify-center">
            <button 
              onClick={() => handleAddReview(booking.id)}
              className="py-2 px-6 text-white font-medium rounded-xl hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
              style={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              <Star className="w-4 h-4" />
              <span>Add Review</span>
            </button>
          </div>
        )}
      </div>

      {/* Review Popup */}
      <AddReviewPopup
        isOpen={showReviewPopup}
        onClose={handleCloseReviewPopup}
        onSubmit={handleReviewSubmit}
        doctorData={{
          name: booking.doctor.name,
          specialization: booking.doctor.specialization,
          avatar: booking.doctor.avatar
        }}
      />
    </>
  );
};