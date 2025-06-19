import { Booking } from '../types/booking';

export const bookingsData: Booking[] = [
  {
    id: '1',
    date: '2023-05-22',
    time: '10:00 AM',
    doctor: {
      id: 'dr1',
      name: 'John Wilson',
      specialization: 'Cardiology',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8
    },
    location: 'Elite clinic, Canada',
    status: 'upcoming',
    appointmentType: 'Consultation',
    notes: 'Regular checkup'
  },
  {
    id: '2',
    date: '2023-05-22',
    time: '10:00 AM',
    doctor: {
      id: 'dr1',
      name: 'John Wilson',
      specialization: 'Cardiology',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8
    },
    location: 'Elite clinic, Canada',
    status: 'upcoming',
    appointmentType: 'Follow-up',
    notes: 'Blood pressure monitoring'
  },
  {
    id: '3',
    date: '2023-05-22',
    time: '10:00 AM',
    doctor: {
      id: 'dr1',
      name: 'John Wilson',
      specialization: 'Cardiology',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8
    },
    location: 'Elite clinic, Canada',
    status: 'upcoming',
    appointmentType: 'Consultation',
    notes: 'Heart health assessment'
  },
  {
    id: '4',
    date: '2023-04-15',
    time: '2:30 PM',
    doctor: {
      id: 'dr2',
      name: 'Dr. Sarah Chen',
      specialization: 'Dentistry',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.9
    },
    location: 'Dental Care Center, Canada',
    status: 'completed',
    appointmentType: 'Cleaning',
    notes: 'Routine dental cleaning'
  },
  {
    id: '5',
    date: '2023-04-10',
    time: '11:00 AM',
    doctor: {
      id: 'dr3',
      name: 'Dr. Mike Ross',
      specialization: 'Orthopedics',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.7
    },
    location: 'Spine Health Clinic, Canada',
    status: 'completed',
    appointmentType: 'Consultation',
    notes: 'Back pain assessment'
  },
  {
    id: '6',
    date: '2023-03-28',
    time: '9:15 AM',
    doctor: {
      id: 'dr4',
      name: 'Dr. Lisa Park',
      specialization: 'Dermatology',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.6
    },
    location: 'Skin Care Clinic, Canada',
    status: 'cancelled',
    appointmentType: 'Consultation',
    notes: 'Skin condition check'
  },
  {
    id: '7',
    date: '2023-03-20',
    time: '3:45 PM',
    doctor: {
      id: 'dr5',
      name: 'Dr. James Wilson',
      specialization: 'Internal Medicine',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8
    },
    location: 'General Health Center, Canada',
    status: 'cancelled',
    appointmentType: 'Physical Exam',
    notes: 'Annual physical examination'
  }
];