import { useState, useEffect } from 'react';
import { dbService, ProviderWithProfile } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DetailedProvider } from '../types/provider';

export const useProviderDetails = (providerId?: string) => {
  const { user } = useAuth();
  const [provider, setProvider] = useState<ProviderWithProfile | null>(null);
  const [detailedProvider, setDetailedProvider] = useState<DetailedProvider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Determine which ID to use
  const targetId = providerId || (user?.id || '');

  // Fetch provider profile
  useEffect(() => {
    const fetchProviderProfile = async () => {
      if (!targetId) {
        setProvider(null);
        setDetailedProvider(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getProviderProfile(targetId);
        
        if (data) {
          setProvider(data);
          
          // Convert to DetailedProvider format for UI
          setDetailedProvider({
            id: data.id,
            name: data.user_profile?.full_name || 'Provider Name',
            specialization: data.specialization || 'Healthcare Provider',
            description: data.bio || "Experienced healthcare provider dedicated to patient care.",
            image: data.user_profile?.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: data.rating || 4.5,
            reviewCount: data.review_count || 0,
            address: data.clinic_address || '123 Medical Center, Downtown',
            distance: '2.5km', // Would need geolocation
            estimatedTime: '20 min', // Would need routing
            availability: 'Mon-Fri',
            hours: '9am - 5pm',
            yearsOfExperience: data.years_of_experience || 0,
            consultationFee: data.consultation_fee || 0
          });
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching provider profile:', err);
        setError(err as Error);
        setProvider(null);
        setDetailedProvider(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderProfile();
  }, [targetId]);

  // Update provider profile
  const updateProviderProfile = async (updates: Partial<ProviderWithProfile>) => {
    if (!targetId) return null;

    try {
      setLoading(true);
      
      // Split updates between user_profile and provider tables
      const userProfileUpdates: any = {};
      const providerUpdates: any = {};
      
      for (const [key, value] of Object.entries(updates)) {
        if (['full_name', 'email', 'phone', 'avatar_url'].includes(key)) {
          userProfileUpdates[key] = value;
        } else {
          providerUpdates[key] = value;
        }
      }
      
      // Update user profile if needed
      if (Object.keys(userProfileUpdates).length > 0) {
        await dbService.updateUserProfile(targetId, userProfileUpdates);
      }
      
      // Update provider profile
      if (Object.keys(providerUpdates).length > 0) {
        await dbService.updateProviderProfile(targetId, providerUpdates);
      }
      
      // Fetch updated profile
      const updatedData = await dbService.getProviderProfile(targetId);
      setProvider(updatedData);
      
      // Update detailed provider
      if (updatedData) {
        setDetailedProvider({
          id: updatedData.id,
          name: updatedData.user_profile?.full_name || 'Provider Name',
          specialization: updatedData.specialization || 'Healthcare Provider',
          description: updatedData.bio || "Experienced healthcare provider dedicated to patient care.",
          image: updatedData.user_profile?.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
          rating: updatedData.rating || 4.5,
          reviewCount: updatedData.review_count || 0,
          address: updatedData.clinic_address || '123 Medical Center, Downtown',
          distance: '2.5km',
          estimatedTime: '20 min',
          availability: 'Mon-Fri',
          hours: '9am - 5pm',
          yearsOfExperience: updatedData.years_of_experience || 0,
          consultationFee: updatedData.consultation_fee || 0
        });
      }
      
      return updatedData;
    } catch (err) {
      console.error('Error updating provider profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    provider,
    detailedProvider,
    loading,
    error,
    updateProviderProfile
  };
};