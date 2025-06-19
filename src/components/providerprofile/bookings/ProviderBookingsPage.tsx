import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookingCard } from './BookingCard';
import { BookingTabs } from './BookingTabs';
import { ProviderBottomNavigation } from '../ProviderBottomNavigation';

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  bookingNumber: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  time: string;
  status: BookingStatus;
}

// Mock data for provider bookings
const mockBookings: Booking[] = [
  {
    id: '1',
    bookingNumber: '#23567',
    patientName: 'Darlene Robertson',
    patientAvatar: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'May 22, 2023',
    time: '10:00 AM',
    status: 'upcoming'
  },
  {
    id: '2',
    bookingNumber: '#23567',
    patientName: 'Leslie Alexander',
    patientAvatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'May 22, 2023',
    time: '10:00 AM',
    status: 'upcoming'
  },
  {
    id: '3',
    bookingNumber: '#23567',
    patientName: 'Cody Fisher',
    patientAvatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'May 22, 2023',
    time: '10:00 AM',
    status: 'upcoming'
  },
  {
    id: '4',
    bookingNumber: '#23567',
    patientName: 'Kristin Watson',
    patientAvatar: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'May 22, 2023',
    time: '10:00 AM',
    status: 'upcoming'
  },
  {
    id: '5',
    bookingNumber: '#23568',
    patientName: 'Robert Johnson',
    patientAvatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'May 20, 2023',
    time: '2:00 PM',
    status: 'completed'
  },
  {
    id: '6',
    bookingNumber: '#23569',
    patientName: 'Emily Davis',
    patientAvatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'May 18, 2023',
    time: '11:30 AM',
    status: 'cancelled'
  }
];

export const ProviderBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');

  const filteredBookings = mockBookings.filter(booking => booking.status === activeTab);

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