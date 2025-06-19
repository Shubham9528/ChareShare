import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookingHeader } from './BookingHeader';
import { BookingTabs } from './BookingTabs';
import { BookingCard } from './BookingCard';
import { BottomNavigation } from '../category/BottomNavigation';
import { bookingsData } from '../../data/bookingsData';

interface BookingPageProps {
  onBack?: () => void;
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export const BookingPage: React.FC<BookingPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');
  const [activeNavTab, setActiveNavTab] = useState('booking');

  const filteredBookings = bookingsData.filter(booking => booking.status === activeTab);

  const handleCancel = (bookingId: string) => {
    console.log('Cancel booking:', bookingId);
    // Implement cancel logic
  };

  const handleReschedule = (bookingId: string) => {
    console.log('Reschedule booking:', bookingId);
    // Implement reschedule logic
  };

  const handleTabChange = (tab: string) => {
    setActiveNavTab(tab);
    
    // Navigate to different routes based on tab
    const basePath = user ? '/patient' : '/browse';
    
    switch (tab) {
      case 'home':
        if (user) {
          navigate('/patient/category');
        } else {
          navigate('/browse');
        }
        break;
      case 'search':
        navigate(`${basePath}/search`);
        break;
      case 'booking':
        if (user) {
          navigate('/patient/bookings');
        } else {
          // Redirect to login for non-authenticated users
          navigate('/login-selection');
        }
        break;
      case 'message':
        if (user) {
          navigate('/patient/messages');
        } else {
          // Redirect to login for non-authenticated users
          navigate('/login-selection');
        }
        break;
      case 'profile':
        if (user) {
          navigate('/patient/profile/setting');
        } else {
          // Redirect to login for non-authenticated users
          navigate('/login-selection');
        }
        break;
    }
  };

  // Determine current tab based on route
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/search')) {
      setActiveNavTab('search');
    } else if (path.includes('/booking')) {
      setActiveNavTab('booking');
    } else if (path.includes('/message')) {
      setActiveNavTab('message');
    } else if (path.includes('/profile') || path.includes('/setting')) {
      setActiveNavTab('profile');
    } else {
      setActiveNavTab('home');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <BookingHeader onBack={onBack} />

      {/* Content */}
      <div className="flex-1 px-4 py-6 pb-24">
        {/* Tabs */}
        <BookingTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Bookings List */}
        <div className="space-y-4 mt-6">
          {filteredBookings.length === 0 ? (
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
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancel}
                onReschedule={handleReschedule}
              />
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeNavTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};