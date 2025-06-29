import { useState, useEffect } from 'react';
import { dbService } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favoriteProviders, setFavoriteProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch favorite providers
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavoriteProviders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getFavoriteProviders(user.id);
        
        // Transform data to match our UI needs
        const providers = data.map(item => ({
          id: item.provider_id,
          name: item.provider?.user_profile?.full_name || 'Provider Name',
          specialization: item.provider?.specialization || 'Healthcare Provider',
          image: item.provider?.user_profile?.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
          rating: item.provider?.rating || 4.5,
          reviewCount: item.provider?.review_count || 0,
          address: item.provider?.clinic_address || '123 Medical Center, Downtown',
          distance: '2.5km', // Would need geolocation
          estimatedTime: '20 min', // Would need routing
          availability: 'Mon-Fri',
          hours: '9am - 5pm',
          isFavorite: true
        }));
        
        setFavoriteProviders(providers);
        setError(null);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError(err as Error);
        setFavoriteProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Add favorite
  const addFavorite = async (providerId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      await dbService.addFavorite(user.id, providerId);
      
      // Refresh favorites
      const data = await dbService.getFavoriteProviders(user.id);
      const providers = data.map(item => ({
        id: item.provider_id,
        name: item.provider?.user_profile?.full_name || 'Provider Name',
        specialization: item.provider?.specialization || 'Healthcare Provider',
        image: item.provider?.user_profile?.avatar_url || 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: item.provider?.rating || 4.5,
        reviewCount: item.provider?.review_count || 0,
        address: item.provider?.clinic_address || '123 Medical Center, Downtown',
        distance: '2.5km',
        estimatedTime: '20 min',
        availability: 'Mon-Fri',
        hours: '9am - 5pm',
        isFavorite: true
      }));
      
      setFavoriteProviders(providers);
      return true;
    } catch (err) {
      console.error('Error adding favorite:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove favorite
  const removeFavorite = async (providerId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      await dbService.removeFavorite(user.id, providerId);
      
      // Update local state
      setFavoriteProviders(prev => prev.filter(provider => provider.id !== providerId));
      return true;
    } catch (err) {
      console.error('Error removing favorite:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    favoriteProviders,
    loading,
    error,
    addFavorite,
    removeFavorite
  };
};