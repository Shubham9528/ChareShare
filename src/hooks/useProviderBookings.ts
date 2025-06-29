import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dbService, AppointmentWithDetails } from '../lib/supabase';

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export const useProviderBookings = (status?: BookingStatus) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentStatus, setCurrentStatus] = useState<BookingStatus | undefined>(status);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getAppointments(user.id, currentStatus);
        
        if (data && Array.isArray(data)) {
          setBookings(data);
        } else {
          // If no data or invalid data, use mock data
          setBookings(mockBookings(user.id, currentStatus));
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err as Error);
        // Use mock data on error
        setBookings(mockBookings(user.id, currentStatus));
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, currentStatus]);

  // Update booking status
  const updateBookingStatus = async (bookingId: string, newStatus: BookingStatus) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      await dbService.updateAppointmentStatus(bookingId, newStatus);
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus } 
            : booking
        )
      );
      
      return true;
    } catch (err) {
      console.error(`Error updating booking to ${newStatus}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    error,
    currentStatus,
    setStatus: setCurrentStatus,
    updateBookingStatus
  };
};

// Mock data for development
function mockBookings(providerId: string, status?: BookingStatus): AppointmentWithDetails[] {
  const allBookings = [
    {
      id: '1',
      patient_id: 'patient1',
      provider_id: providerId,
      appointment_date: '2025-05-22',
      appointment_time: '10:00:00',
      duration_minutes: 30,
      status: 'upcoming' as const,
      appointment_type: 'Consultation',
      notes: 'Regular checkup',
      location: 'Elite clinic, Canada',
      consultation_fee: 150,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      provider: {
        user_profile: {
          full_name: 'Dr. James Harris',
          avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        specialization: 'Dentist',
        rating: 4.9
      },
      patient: {
        user_profile: {
          full_name: 'Darlene Robertson',
          avatar_url: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100'
        }
      }
    },
    {
      id: '2',
      patient_id: 'patient2',
      provider_id: providerId,
      appointment_date: '2025-05-22',
      appointment_time: '11:30:00',
      duration_minutes: 30,
      status: 'upcoming' as const,
      appointment_type: 'Follow-up',
      notes: 'Follow-up appointment',
      location: 'Elite clinic, Canada',
      consultation_fee: 120,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      provider: {
        user_profile: {
          full_name: 'Dr. James Harris',
          avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        specialization: 'Dentist',
        rating: 4.9
      },
      patient: {
        user_profile: {
          full_name: 'Leslie Alexander',
          avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
        }
      }
    },
    {
      id: '3',
      patient_id: 'patient3',
      provider_id: providerId,
      appointment_date: '2025-04-15',
      appointment_time: '14:30:00',
      duration_minutes: 45,
      status: 'completed' as const,
      appointment_type: 'Cleaning',
      notes: 'Routine dental cleaning',
      location: 'Elite clinic, Canada',
      consultation_fee: 180,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      provider: {
        user_profile: {
          full_name: 'Dr. James Harris',
          avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        specialization: 'Dentist',
        rating: 4.9
      },
      patient: {
        user_profile: {
          full_name: 'Robert Johnson',
          avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
        }
      }
    },
    {
      id: '4',
      patient_id: 'patient4',
      provider_id: providerId,
      appointment_date: '2025-03-28',
      appointment_time: '09:15:00',
      duration_minutes: 30,
      status: 'cancelled' as const,
      appointment_type: 'Consultation',
      notes: 'Cancelled by patient',
      location: 'Elite clinic, Canada',
      consultation_fee: 150,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      provider: {
        user_profile: {
          full_name: 'Dr. James Harris',
          avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        specialization: 'Dentist',
        rating: 4.9
      },
      patient: {
        user_profile: {
          full_name: 'Emily Davis',
          avatar_url: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100'
        }
      }
    }
  ];

  if (status) {
    return allBookings.filter(booking => booking.status === status);
  }
  
  return allBookings;
}