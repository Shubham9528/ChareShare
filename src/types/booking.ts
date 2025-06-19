export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  rating: number;
}

export interface Booking {
  id: string;
  date: string;
  time: string;
  doctor: Doctor;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  appointmentType?: string;
  notes?: string;
}