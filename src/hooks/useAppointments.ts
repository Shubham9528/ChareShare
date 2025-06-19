import { useState, useEffect } from 'react';
import { dbService, AppointmentWithDetails } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export const useAppointments = (initialStatus?: AppointmentStatus) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<AppointmentStatus | undefined>(initialStatus);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        setAppointments([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getAppointments(user.id, status);
        setAppointments(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, status]);

  const cancelAppointment = async (appointmentId: string) => {
    if (!user) return;

    try {
      await dbService.updateAppointmentStatus(appointmentId, 'cancelled');
      
      // Update local state
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: 'cancelled' } 
            : appointment
        )
      );
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      throw err;
    }
  };

  const completeAppointment = async (appointmentId: string) => {
    if (!user) return;

    try {
      await dbService.updateAppointmentStatus(appointmentId, 'completed');
      
      // Update local state
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: 'completed' } 
            : appointment
        )
      );
    } catch (err) {
      console.error('Error completing appointment:', err);
      throw err;
    }
  };

  return {
    appointments,
    loading,
    error,
    status,
    setStatus,
    cancelAppointment,
    completeAppointment
  };
};