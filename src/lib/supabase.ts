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

export interface InsuranceBenefit {
  id: string;
  patient_id: string;
  benefit_type: string;
  provider_name: string;
  policy_number?: string;
  total_amount: number;
  used_amount: number;
  renewal_date?: string;
  created_at: string;
  updated_at: string;
}

// Combined types for UI
export interface ProviderWithProfile extends ProviderProfile {
  user_profile?: UserProfile;
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
    // Use upsert to handle both insert and update scenarios
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({ id: userId, ...updates }, { onConflict: 'id' })
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

  async addProviderProfile(providerId: string, profileData: Partial<ProviderProfile>) {
    const defaultData = {
      id: providerId,
      specialization: profileData.specialization || 'General Practice',
      years_of_experience: profileData.years_of_experience || 0,
      consultation_fee: profileData.consultation_fee || 0,
      is_verified: false,
      rating: 0.0,
      review_count: 0,
      availability_hours: {},
      ...profileData
    };

    // Use upsert to handle both insert and update scenarios
    const { data, error } = await supabase
      .from('providers')
      .upsert(defaultData, { onConflict: 'id' })
      .select()
      .single();
    
    if (error) throw error;
    return data as ProviderProfile;
  },

  async updateProviderProfile(providerId: string, updates: Partial<ProviderProfile>) {
    // Use upsert to handle cases where the provider profile might not exist yet
    const { data, error } = await supabase
      .from('providers')
      .upsert({ id: providerId, ...updates }, { onConflict: 'id' })
      .select()
      .single();
    
    if (error) throw error;
    return data as ProviderProfile;
  },

  async getAllProviders(category?: string, searchTerm?: string) {
    try {
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
      
      // If no data from database, return mock data for development
      if (!data || data.length === 0) {
        console.log('No providers found in database, using mock data');
        return mockProviders();
      }
      
      return data as ProviderWithProfile[];
    } catch (err) {
      console.error('Error fetching providers:', err);
      // Return mock data on error for development
      return mockProviders();
    }
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
    try {
      // This is a more complex query to get the latest message from each conversation
      const { data, error } = await supabase.rpc('get_conversations', { user_id: userId });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching conversations:', err);
      // Return mock data for development
      return mockConversations();
    }
  },

  async getMessages(userId: string, otherUserId: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Message[];
    } catch (err) {
      console.error('Error fetching messages:', err);
      // Return mock data for development
      return mockMessages();
    }
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
    try {
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
      return data || [];
    } catch (err) {
      console.error('Error fetching favorites:', err);
      return [];
    }
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
    try {
      const { data, error } = await supabase
        .from('provider_categories')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data as ProviderCategory[];
    } catch (err) {
      console.error('Error fetching provider categories:', err);
      // Return mock categories on error
      return mockCategories();
    }
  },

  // Insurance benefits
  async getInsuranceBenefits(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('insurance_benefits')
        .select('*')
        .eq('patient_id', patientId)
        .order('benefit_type', { ascending: true });
      
      if (error) throw error;
      return data as InsuranceBenefit[];
    } catch (err) {
      console.error('Error fetching insurance benefits:', err);
      return [];
    }
  },

  async addInsuranceBenefit(benefit: Omit<InsuranceBenefit, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('insurance_benefits')
      .insert(benefit)
      .select()
      .single();
    
    if (error) throw error;
    return data as InsuranceBenefit;
  },

  async updateInsuranceBenefit(benefitId: string, updates: Partial<InsuranceBenefit>) {
    const { data, error } = await supabase
      .from('insurance_benefits')
      .update(updates)
      .eq('id', benefitId)
      .select()
      .single();
    
    if (error) throw error;
    return data as InsuranceBenefit;
  },

  async deleteInsuranceBenefit(benefitId: string) {
    const { error } = await supabase
      .from('insurance_benefits')
      .delete()
      .eq('id', benefitId);
    
    if (error) throw error;
    return true;
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

// Mock data functions for development and fallback
function mockProviders(): ProviderWithProfile[] {
  return [
    {
      id: '1',
      specialization: 'Dentist',
      license_number: 'DEN12345',
      years_of_experience: 8,
      clinic_name: 'Smile Dental Clinic',
      clinic_address: '123 Main St, Toronto',
      bio: 'Experienced dentist specializing in cosmetic and general dentistry.',
      consultation_fee: 150,
      is_verified: true,
      rating: 4.8,
      review_count: 120,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_profile: {
        id: '1',
        user_type: 'provider',
        full_name: 'Dr. Sarah Chen',
        email: 'sarah.chen@example.com',
        avatar_url: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    },
    {
      id: '2',
      specialization: 'Dentist',
      license_number: 'DEN67890',
      years_of_experience: 12,
      clinic_name: 'Downtown Dental',
      clinic_address: '456 Oak St, Toronto',
      bio: 'Providing comprehensive dental care with a gentle approach.',
      consultation_fee: 180,
      is_verified: true,
      rating: 4.9,
      review_count: 95,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_profile: {
        id: '2',
        user_type: 'provider',
        full_name: 'Dr. Michael Johnson',
        email: 'michael.johnson@example.com',
        avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    },
    {
      id: '3',
      specialization: 'Dentist',
      license_number: 'DEN54321',
      years_of_experience: 5,
      clinic_name: 'Modern Dental Care',
      clinic_address: '789 Pine Ave, Toronto',
      bio: 'Passionate about preventive dental care and patient education.',
      consultation_fee: 130,
      is_verified: true,
      rating: 4.7,
      review_count: 68,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_profile: {
        id: '3',
        user_type: 'provider',
        full_name: 'Dr. Emily Wilson',
        email: 'emily.wilson@example.com',
        avatar_url: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
  ];
}

function mockCategories(): ProviderCategory[] {
  return [
    {
      id: '1',
      name: 'Dentist',
      icon_svg: '<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22344 1.44199C6.43594 0.832617 5.47031 0.499805 4.47656 0.499805C2.00156 0.499805 0 2.50137 0 4.97637V5.26699C0 6.00762 0.173438 6.73418 0.501563 7.39981L1.60312 9.60762C1.81406 10.0248 1.95937 10.4701 2.04375 10.9295L3.76406 20.5764C3.85781 21.1014 4.30781 21.4857 4.8375 21.5045C5.36719 21.5232 5.84062 21.1576 5.9625 20.642L7.31719 14.9561C7.50938 14.1732 8.20312 13.6248 9 13.6248C9.79688 13.6248 10.4906 14.1732 10.6781 14.9514L12.0328 20.6373C12.1547 21.1576 12.6281 21.5186 13.1578 21.4998C13.6875 21.4811 14.1375 21.0967 14.2313 20.5717L15.9516 10.9248C16.0359 10.4654 16.1813 10.0201 16.3922 9.60293L17.4938 7.39512C17.8266 6.73418 17.9953 6.00293 17.9953 5.2623V5.16387C17.9953 2.58574 15.9047 0.495117 13.3266 0.495117C12.1969 0.495117 11.1047 0.907617 10.2516 1.64824L10.1016 1.77949L11.0156 2.49199C11.3438 2.74512 11.4 3.21855 11.1469 3.54668C10.8937 3.8748 10.4203 3.93105 10.0922 3.67793L8.94844 2.7873L7.21406 1.4373L7.22344 1.44199Z" fill="currentColor"/></svg>',
      icon_color: 'text-blue-600',
      icon_bg: 'bg-blue-100',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Physiotherapist',
      icon_svg: '<svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_377_4342)"><g clip-path="url(#clip1_377_4342)"><path d="M8.00001 2.25C8.00001 1.65326 8.23706 1.08097 8.65902 0.65901C9.08097 0.237053 9.65327 0 10.25 0C10.8467 0 11.419 0.237053 11.841 0.65901C12.263 1.08097 12.5 1.65326 12.5 2.25C12.5 2.84674 12.263 3.41903 11.841 3.84099C11.419 4.26295 10.8467 4.5 10.25 4.5C9.65327 4.5 9.08097 4.26295 8.65902 3.84099C8.23706 3.41903 8.00001 2.84674 8.00001 2.25ZM6.42969 9.34219C6.38282 9.36094 6.34063 9.37969 6.29376 9.39844L5.91876 9.5625C5.15001 9.90469 4.55938 10.5562 4.29219 11.3531L4.17032 11.7188C3.90782 12.5063 3.05938 12.9281 2.27188 12.6656C1.48438 12.4031 1.06251 11.5547 1.32501 10.7672L1.44688 10.4016C1.98126 8.80312 3.16251 7.5 4.70001 6.81562L5.07501 6.65156C6.05001 6.22031 7.10469 5.99531 8.17344 5.99531C10.2641 5.99531 12.1484 7.25156 12.95 9.17813L13.6719 10.9078L14.675 11.4094C15.4156 11.7797 15.7156 12.6797 15.3453 13.4203C14.975 14.1609 14.075 14.4609 13.3344 14.0906L12.0781 13.4672C11.5953 13.2234 11.2156 12.8203 11.0094 12.3187L10.5594 11.2406L9.65469 14.3109L11.975 16.8422C12.2281 17.1187 12.4063 17.4516 12.5 17.8172L13.5781 22.1344C13.7797 22.9359 13.2922 23.7516 12.4859 23.9531C11.6797 24.1547 10.8688 23.6672 10.6672 22.8609L9.63594 18.7313L6.32188 15.1172C5.62813 14.3625 5.37032 13.3078 5.63282 12.3187L6.42501 9.34219H6.42969ZM3.72032 18.6562L4.89219 15.7313C4.99063 15.8719 5.10313 16.0031 5.22032 16.1344L7.12813 18.2156L6.44844 19.9125C6.33594 20.1937 6.16719 20.4516 5.95157 20.6672L3.05938 23.5594C2.47344 24.1453 1.52188 24.1453 0.935944 23.5594C0.350006 22.9734 0.350006 22.0219 0.935944 21.4359L3.72032 18.6562Z" fill="currentColor"/></g></g><defs><clipPath id="clip0_377_4342"><rect width="15" height="24" fill="white" transform="translate(0.5)"/></clipPath><clipPath id="clip1_377_4342"><path d="M0.5 0H15.5V24H0.5V0Z" fill="white"/></clipPath></defs></svg>',
      icon_color: 'text-green-600',
      icon_bg: 'bg-green-100',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Chiropractor',
      icon_svg: '<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_377_4355)"><path d="M7.20469 6.7875C7.52812 7.55156 8.17031 8.25 9 8.25H18C18.8297 8.25 19.4719 7.55156 19.7953 6.7875C20.3625 5.44219 21.6984 4.5 23.25 4.5C25.3219 4.5 27 6.17812 27 8.25C27 9.675 26.2031 10.9172 25.0312 11.55C24.8625 11.6391 24.75 11.8078 24.75 12C24.75 12.1922 24.8625 12.3609 25.0312 12.45C26.2031 13.0828 27 14.325 27 15.75C27 17.8219 25.3219 19.5 23.25 19.5C21.6984 19.5 20.3625 18.5578 19.7953 17.2125C19.4719 16.4484 18.8297 15.75 18 15.75H9C8.17031 15.75 7.52812 16.4484 7.20469 17.2125C6.6375 18.5578 5.30156 19.5 3.75 19.5C1.67812 19.5 0 17.8219 0 15.75C0 14.325 0.796875 13.0828 1.96875 12.45C2.1375 12.3609 2.25 12.1922 2.25 12C2.25 11.8078 2.1375 11.6391 1.96875 11.55C0.796875 10.9172 0 9.675 0 8.25C0 6.17812 1.67812 4.5 3.75 4.5C5.30156 4.5 6.6375 5.44219 7.20469 6.7875Z" fill="currentColor"/></g><defs><clipPath id="clip0_377_4355"><rect width="27" height="24" fill="white"/></clipPath></defs></svg>',
      icon_color: 'text-purple-600',
      icon_bg: 'bg-purple-100',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Massage',
      icon_svg: '<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_377_4367)"><g clip-path="url(#clip1_377_4367)"><path d="M25.5 7.50037L25.4953 10.9035C25.4906 13.3504 24.3703 15.6379 22.4953 17.1426C22.5 17.0535 22.5 16.9644 22.5 16.8754V16.5004C22.5 13.1347 20.7656 10.0035 17.9109 8.21756L15.0891 6.45506C14.6859 6.20193 14.25 6.06131 13.8094 6.01443L11.6578 2.28787C11.3484 1.74881 11.5312 1.05974 12.0703 0.75037C12.6094 0.440995 13.2984 0.623807 13.6078 1.16287L17.2641 7.49568C17.4187 7.76287 17.7656 7.85662 18.0328 7.70193C18.3 7.54725 18.3938 7.20037 18.2391 6.93318L15.3328 1.89881C15.0234 1.35974 15.2062 0.670682 15.7453 0.361307C16.2844 0.051932 16.9688 0.234745 17.2781 0.773807L20.4656 6.29568L22.4953 9.81131L22.5 7.50037C22.5 6.67068 23.175 6.00037 24 6.00037C24.825 6.00037 25.5 6.67537 25.5 7.50037ZM11.4328 4.14881L12.5859 6.141C11.9344 6.35193 11.3484 6.78318 10.9594 7.40662C10.9172 7.47225 10.8797 7.54256 10.8422 7.61287L9.4875 5.26912C9.17812 4.73006 9.36094 4.04099 9.9 3.73162C10.4391 3.42224 11.1281 3.60506 11.4375 4.14412L11.4328 4.14881ZM9.25781 7.13475L10.5141 9.30975C10.5422 9.591 10.6125 9.86287 10.7156 10.1254H10.5H9.87656H8.39062L7.3125 8.25975C7.00313 7.72068 7.18594 7.03162 7.725 6.72225C8.26406 6.41287 8.95313 6.59568 9.2625 7.13475H9.25781ZM12.2297 8.2035C12.6703 7.50037 13.5938 7.28943 14.2969 7.72537L17.1188 9.48787C19.5328 11.0019 21 13.6504 21 16.5004V16.8754C21 20.8082 17.8078 24.0004 13.875 24.0004H5.625C5.00156 24.0004 4.5 23.4988 4.5 22.8754C4.5 22.2519 5.00156 21.7504 5.625 21.7504H9.9375C10.2469 21.7504 10.5 21.4972 10.5 21.1879C10.5 20.8785 10.2469 20.6254 9.9375 20.6254H4.125C3.50156 20.6254 3 20.1238 3 19.5004C3 18.8769 3.50156 18.3754 4.125 18.3754H9.9375C10.2469 18.3754 10.5 18.1222 10.5 17.8129C10.5 17.5035 10.2469 17.2504 9.9375 17.2504H2.625C2.00156 17.2504 1.5 16.7488 1.5 16.1254C1.5 15.5019 2.00156 15.0004 2.625 15.0004H9.9375C10.2469 15.0004 10.5 14.7472 10.5 14.4379C10.5 14.1285 10.2469 13.8754 9.9375 13.8754H4.125C3.50156 13.8754 3 13.3738 3 12.7504C3 12.1269 3.50156 11.6254 4.125 11.6254H10.5H14.8688L12.7031 10.2707C12 9.83006 11.7891 8.90662 12.225 8.2035H12.2297Z" fill="currentColor"/></g></g><defs><clipPath id="clip0_377_4367"><rect width="27" height="24" fill="white"/></clipPath><clipPath id="clip1_377_4367"><path d="M0 0H27V24H0V0Z" fill="white"/></clipPath></defs></svg>',
      icon_color: 'text-orange-600',
      icon_bg: 'bg-orange-100',
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Podiatrist',
      icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_377_4378)"><g clip-path="url(#clip1_377_4378)"><path d="M8.7125 22.3406C8.2578 21.4969 8 20.5266 8 19.5C8 17.6109 8.8906 15.8344 10.4 14.7L13.4 12.45C13.7797 12.1688 14 11.7234 14 11.25V4.5H6.5V11.25C6.5 12.1922 6.0547 13.0828 5.3 13.65L2.3 15.9C1.1656 16.7484 0.5 18.0844 0.5 19.5C0.5 21.9844 2.5156 24 5 24C5.975 24 6.9219 23.6859 7.7 23.1L8.7125 22.3406ZM6.5 3H14V2.25C14 1.5703 14.1828 0.928125 14.5016 0.379688C14.1406 0.140625 13.7141 0 13.25 0H8.75C7.5078 0 6.5 1.00781 6.5 2.25V3ZM15.5 4.5V11.25C15.5 12.1922 15.0547 13.0828 14.3 13.65L11.3 15.9C10.1656 16.7484 9.5 18.0844 9.5 19.5C9.5 21.9844 11.5156 24 14 24C14.975 24 15.9219 23.6859 16.7 23.1L22.1 19.05C23.6094 17.9156 24.5 16.1391 24.5 14.25V4.5H15.5ZM24.5 3V2.25C24.5 1.00781 23.4922 0 22.25 0H17.75C16.5078 0 15.5 1.00781 15.5 2.25V3H24.5Z" fill="currentColor"/></g></g><defs><clipPath id="clip0_377_4378"><rect width="24" height="24" fill="white"/></clipPath><clipPath id="clip1_377_4378"><path d="M0 0H24V24H0V0Z" fill="white"/></clipPath></defs></svg>',
      icon_color: 'text-teal-600',
      icon_bg: 'bg-teal-100',
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Physician',
      icon_svg: '<svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_377_4378)"><g clip-path="url(#clip1_377_4378)"><path d="M10.5 12C12.091 12 13.617 11.3679 14.743 10.2426C15.868 9.11742 16.5 7.59131 16.5 6C16.5 4.40869 15.868 2.88258 14.743 1.75736C13.617 0.632141 12.091 0 10.5 0C8.90869 0 7.38258 0.632141 6.25736 1.75736C5.13214 2.88258 4.5 4.40869 4.5 6C4.5 7.59131 5.13214 9.11742 6.25736 10.2426C7.38258 11.3679 8.90869 12 10.5 12ZM6 14.5875C2.531 15.6047 0 18.8109 0 22.6078C0 23.3766 0.623 24 1.392 24H19.608C20.377 24 21 23.3766 21 22.6078C21 18.8109 18.469 15.6047 15 14.5875V16.9688C16.294 17.3016 17.25 18.4781 17.25 19.875V21.75C17.25 22.1625 16.913 22.5 16.5 22.5H15.75C15.337 22.5 15 22.1625 15 21.75C15 21.3375 15.337 21 15.75 21V19.875C15.75 19.0453 15.08 18.375 14.25 18.375C13.42 18.375 12.75 19.0453 12.75 19.875V21C13.163 21 13.5 21.3375 13.5 21.75C13.5 22.1625 13.163 22.5 12.75 22.5H12C11.587 22.5 11.25 22.1625 11.25 21.75V19.875C11.25 18.4781 12.206 17.3016 13.5 16.9688V14.2922C13.219 14.2641 12.933 14.25 12.642 14.25H8.358C8.067 14.25 7.781 14.2641 7.5 14.2922V17.3578C8.583 17.6812 9.375 18.6844 9.375 19.875C9.375 21.3234 8.198 22.5 6.75 22.5C5.302 22.5 4.125 21.3234 4.125 19.875C4.125 18.6844 4.917 17.6812 6 17.3578V14.5875ZM6.75 21C7.048 21 7.335 20.8815 7.545 20.6705C7.756 20.4595 7.875 20.1734 7.875 19.875C7.875 19.5766 7.756 19.2905 7.545 19.0795C7.335 18.8685 7.048 18.75 6.75 18.75C6.452 18.75 6.165 18.8685 5.955 19.0795C5.744 19.2905 5.625 19.5766 5.625 19.875C5.625 20.1734 5.744 20.4595 5.955 20.6705C6.165 20.8815 6.452 21 6.75 21Z" fill="currentColor"/></g></g><defs><clipPath id="clip0_377_4378"><rect width="21" height="24" fill="white"/></clipPath><clipPath id="clip1_377_4378"><path d="M0 0H21V24H0V0Z" fill="white"/></clipPath></defs></svg>',
      icon_color: 'text-red-600',
      icon_bg: 'bg-red-100',
      created_at: new Date().toISOString()
    }
  ];
}

function mockConversations() {
  return [
    {
      id: 'chat1',
      other_user_id: 'user1',
      full_name: 'Alex Linderson',
      avatar_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
      last_message: 'How are you today?',
      last_message_time: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      unread_count: 3,
      specialization: 'General Practice'
    },
    {
      id: 'chat2',
      other_user_id: 'user2',
      full_name: 'Team Align',
      avatar_url: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
      last_message: "Don't miss to attend the meeting.",
      last_message_time: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      unread_count: 3,
      specialization: 'Team Communication'
    }
  ];
}

function mockMessages() {
  return [
    {
      id: '1',
      sender_id: 'user1',
      receiver_id: 'currentUser',
      content: 'Hello, how are you?',
      message_type: 'text',
      is_read: true,
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      sender_id: 'currentUser',
      receiver_id: 'user1',
      content: 'I am doing well, thank you!',
      message_type: 'text',
      is_read: true,
      created_at: new Date(Date.now() - 4 * 60 * 1000).toISOString()
    }
  ] as Message[];
}