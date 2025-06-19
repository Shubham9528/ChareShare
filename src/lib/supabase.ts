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
  phone?: string | null;
  avatar_url?: string | null;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProviderProfile {
  id: string;
  specialization: string;
  license_number?: string | null;
  years_of_experience: number;
  clinic_name?: string | null;
  clinic_address?: string | null;
  bio?: string | null;
  consultation_fee: number;
  is_verified: boolean;
  rating: number;
  review_count: number;
  availability_hours?: any;
  created_at: string;
  updated_at: string;
}

export interface PatientProfile {
  id: string;
  date_of_birth?: string | null;
  gender?: 'male' | 'female' | 'other' | null;
  blood_type?: string | null;
  medical_history?: string | null;
  allergies?: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmergencyContact {
  id: string;
  patient_id: string;
  name: string;
  relationship: string;
  phone: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  provider_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  appointment_type: string;
  notes?: string | null;
  location: string;
  consultation_fee: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  is_read: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  patient_id: string;
  provider_id: string;
  appointment_id?: string | null;
  rating: number;
  comment?: string | null;
  created_at: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  record_type: string;
  document_name: string;
  document_url?: string | null;
  upload_date: string;
}

export interface ProviderPackage {
  id: string;
  provider_id: string;
  package_type: 'voice' | 'video' | 'message' | 'in-person';
  title: string;
  description?: string | null;
  price: number;
  duration: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: 'appointment' | 'message' | 'reminder' | 'update';
  is_read: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  patient_id: string;
  provider_id: string;
  created_at: string;
}

export interface ProviderCategory {
  id: string;
  name: string;
  icon_svg: string;
  icon_color: string;
  icon_bg: string;
  created_at: string;
}

// Combined types for UI
export interface ProviderWithProfile extends ProviderProfile {
  user_profile: UserProfile;
}

export interface PatientWithProfile extends PatientProfile {
  user_profile: UserProfile;
}

export interface AppointmentWithDetails extends Appointment {
  provider: {
    user_profile: Pick<UserProfile, 'full_name' | 'avatar_url'>;
    specialization: string;
    rating: number;
  };
  patient: {
    user_profile: Pick<UserProfile, 'full_name' | 'avatar_url'>;
  };
}

// Database service functions
export const dbService = {
  // User profiles
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  },

  // Provider profiles
  async getProviderProfile(providerId: string) {
    const { data, error } = await supabase
      .from('providers')
      .select(`
        *,
        user_profile:user_profiles(*)
      `)
      .eq('id', providerId)
      .single();
    
    if (error) throw error;
    return data as ProviderWithProfile;
  },

  async updateProviderProfile(providerId: string, updates: Partial<ProviderProfile>) {
    const { data, error } = await supabase
      .from('providers')
      .update(updates)
      .eq('id', providerId)
      .select()
      .single();
    
    if (error) throw error;
    return data as ProviderProfile;
  },

  async getAllProviders(category?: string, searchTerm?: string) {
    let query = supabase
      .from('providers')
      .select(`
        *,
        user_profile:user_profiles(*)
      `);
    
    if (category) {
      query = query.eq('specialization', category);
    }
    
    if (searchTerm) {
      query = query.or(`user_profile.full_name.ilike.%${searchTerm}%,specialization.ilike.%${searchTerm}%`);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data as ProviderWithProfile[];
  },

  // Patient profiles
  async getPatientProfile(patientId: string) {
    const { data, error } = await supabase
      .from('patients')
      .select(`
        *,
        user_profile:user_profiles(*)
      `)
      .eq('id', patientId)
      .single();
    
    if (error) throw error;
    return data as PatientWithProfile;
  },

  async updatePatientProfile(patientId: string, updates: Partial<PatientProfile>) {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', patientId)
      .select()
      .single();
    
    if (error) throw error;
    return data as PatientProfile;
  },

  // Emergency contacts
  async getEmergencyContacts(patientId: string) {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .eq('patient_id', patientId);
    
    if (error) throw error;
    return data as EmergencyContact[];
  },

  async addEmergencyContact(contact: Omit<EmergencyContact, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .insert(contact)
      .select()
      .single();
    
    if (error) throw error;
    return data as EmergencyContact;
  },

  async deleteEmergencyContact(contactId: string) {
    const { error } = await supabase
      .from('emergency_contacts')
      .delete()
      .eq('id', contactId);
    
    if (error) throw error;
    return true;
  },

  // Appointments
  async getAppointments(userId: string, status?: 'upcoming' | 'completed' | 'cancelled') {
    let query = supabase
      .from('appointments')
      .select(`
        *,
        provider:providers(
          user_profile:user_profiles(full_name, avatar_url),
          specialization,
          rating
        ),
        patient:patients(
          user_profile:user_profiles(full_name, avatar_url)
        )
      `)
      .or(`patient_id.eq.${userId},provider_id.eq.${userId}`);
    
    if (status) {
      query = query.eq('status', status);
    }
    
    query = query.order('appointment_date', { ascending: true });
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data as AppointmentWithDetails[];
  },

  async createAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointment)
      .select()
      .single();
    
    if (error) throw error;
    return data as Appointment;
  },

  async updateAppointmentStatus(appointmentId: string, status: 'upcoming' | 'completed' | 'cancelled') {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', appointmentId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Appointment;
  },

  // Messages
  async getConversations(userId: string) {
    // This is a more complex query to get the latest message from each conversation
    const { data, error } = await supabase.rpc('get_conversations', { user_id: userId });
    
    if (error) throw error;
    return data;
  },

  async getMessages(userId: string, otherUserId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as Message[];
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();
    
    if (error) throw error;
    return data as Message;
  },

  async markMessagesAsRead(userId: string, senderId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('receiver_id', userId)
      .eq('sender_id', senderId)
      .eq('is_read', false);
    
    if (error) throw error;
    return true;
  },

  // Reviews
  async getProviderReviews(providerId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        patient:patients(
          user_profile:user_profiles(full_name, avatar_url)
        )
      `)
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async addReview(review: Omit<Review, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    
    if (error) throw error;
    return data as Review;
  },

  // Medical records
  async getMedicalRecords(patientId: string) {
    const { data, error } = await supabase
      .from('medical_records')
      .select('*')
      .eq('patient_id', patientId)
      .order('upload_date', { ascending: false });
    
    if (error) throw error;
    return data as MedicalRecord[];
  },

  async addMedicalRecord(record: Omit<MedicalRecord, 'id'>) {
    const { data, error } = await supabase
      .from('medical_records')
      .insert(record)
      .select()
      .single();
    
    if (error) throw error;
    return data as MedicalRecord;
  },

  async deleteMedicalRecord(recordId: string) {
    const { error } = await supabase
      .from('medical_records')
      .delete()
      .eq('id', recordId);
    
    if (error) throw error;
    return true;
  },

  // Provider packages
  async getProviderPackages(providerId: string) {
    const { data, error } = await supabase
      .from('provider_packages')
      .select('*')
      .eq('provider_id', providerId)
      .order('price', { ascending: true });
    
    if (error) throw error;
    return data as ProviderPackage[];
  },

  async addProviderPackage(packageData: Omit<ProviderPackage, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('provider_packages')
      .insert(packageData)
      .select()
      .single();
    
    if (error) throw error;
    return data as ProviderPackage;
  },

  async updateProviderPackage(packageId: string, updates: Partial<ProviderPackage>) {
    const { data, error } = await supabase
      .from('provider_packages')
      .update(updates)
      .eq('id', packageId)
      .select()
      .single();
    
    if (error) throw error;
    return data as ProviderPackage;
  },

  async deleteProviderPackage(packageId: string) {
    const { error } = await supabase
      .from('provider_packages')
      .delete()
      .eq('id', packageId);
    
    if (error) throw error;
    return true;
  },

  // Notifications
  async getNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Notification[];
  },

  async markNotificationAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Notification;
  },

  async markAllNotificationsAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
    return true;
  },

  // Favorites
  async getFavoriteProviders(patientId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        provider:providers(
          *,
          user_profile:user_profiles(*)
        )
      `)
      .eq('patient_id', patientId);
    
    if (error) throw error;
    return data;
  },

  async addFavorite(patientId: string, providerId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        patient_id: patientId,
        provider_id: providerId
      })
      .select()
      .single();
    
    if (error && error.code !== '23505') throw error; // Ignore unique constraint violations
    return data as Favorite;
  },

  async removeFavorite(patientId: string, providerId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('patient_id', patientId)
      .eq('provider_id', providerId);
    
    if (error) throw error;
    return true;
  },

  async checkIsFavorite(patientId: string, providerId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('patient_id', patientId)
      .eq('provider_id', providerId)
      .maybeSingle();
    
    if (error) throw error;
    return !!data;
  },

  // Provider categories
  async getProviderCategories() {
    const { data, error } = await supabase
      .from('provider_categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as ProviderCategory[];
  },

  // File storage
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;
    return data;
  },

  getFileUrl(bucket: string, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) throw error;
    return true;
  }
};