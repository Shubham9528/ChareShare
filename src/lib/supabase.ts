import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connected successfully');
  }
});

// Database types
export interface UserProfile {
  id: string;
  user_type: 'provider' | 'patient';
  full_name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface ProviderProfile extends UserProfile {
  user_type: 'provider';
  license_number?: string;
  specialization?: string;
  years_of_experience?: number;
  clinic_name?: string;
  clinic_address?: string;
  bio?: string;
  consultation_fee?: number;
  is_verified: boolean;
}

export interface PatientProfile extends UserProfile {
  user_type: 'patient';
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  blood_type?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_history?: string;
  allergies?: string;
}