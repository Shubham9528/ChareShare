import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookingCard } from './BookingCard';
import { BookingTabs } from './BookingTabs';
import { ProviderBottomNavigation } from '../ProviderBottomNavigation';
import { useProviderBookings, BookingStatus } from '../../../hooks/useProviderBookings';

export const ProviderBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');
  
  const { 
    bookings, 
    loading, 
    setStatus,
    updateBookingStatus
  } = useProviderBookings(activeTab);

  // Update status when tab changes
  const handleTabChange = (tab: BookingStatus) => {
    setActiveTab(tab);
    setStatus(tab);
  };

  // Handle booking actions
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, 'cancelled');
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const handleCompleteBooking = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, 'completed');
    } catch (error) {
      console.error('Failed to complete booking:', error);
      alert('Failed to complete booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Empty space for layout balance */}
          <div className="w-10"></div>
          
          <h1 className="text-xl font-semibold text-gray-900">
            Bookings
          </h1>
          
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Search className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {/* Tabs */}
        <BookingTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />

        {/* Bookings List */}
        <div className="space-y-4 mt-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-gray-600">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming appointments." 
                  : `No ${activeTab} appointments found.`}
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={{
                  id: booking.id,
                  bookingNumber: `#${booking.id.substring(0, 5)}`,
                  patientName: booking.patient.user_profile.full_name,
                  patientAvatar: booking.patient.user_profile.avatar_url || 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100',
                  date: new Date(booking.appointment_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                  time: booking.appointment_time.substring(0, 5),
                  status: booking.status
                }}
                onCancel={handleCancelBooking}
                onComplete={handleCompleteBooking}
              />
            ))
          )}
        </div>
      </div>

      {/* Provider Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};