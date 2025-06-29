import { useState, useEffect } from 'react';
import { dbService, ProviderWithProfile } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export type SortOption = 'default' | 'rating' | 'distance' | 'price';

export const useProviders = (initialCategory?: string) => {
  const { user } = useAuth();
  const [providers, setProviders] = useState<ProviderWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [category, setCategory] = useState(initialCategory || '');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const data = await dbService.getAllProviders(category, searchTerm);
        
        // Ensure data is valid
        if (data && Array.isArray(data)) {
          setProviders(data);
        } else {
          console.error('Invalid provider data received:', data);
          setProviders([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError(err as Error);
        setProviders([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [category, searchTerm]);

  // Fetch favorites if user is logged in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }

      try {
        const data = await dbService.getFavoriteProviders(user.id);
        if (data && Array.isArray(data)) {
          const favoriteIds = data.map(fav => fav.provider_id);
          setFavorites(favoriteIds);
        } else {
          setFavorites([]);
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [user]);

  // Toggle favorite
  const toggleFavorite = async (providerId: string) => {
    if (!user) return;

    try {
      const isFavorite = favorites.includes(providerId);
      
      if (isFavorite) {
        await dbService.removeFavorite(user.id, providerId);
        setFavorites(prev => prev.filter(id => id !== providerId));
      } else {
        await dbService.addFavorite(user.id, providerId);
        setFavorites(prev => [...prev, providerId]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  // Sort providers
  const sortedProviders = [...providers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price':
        return (a.consultation_fee || 0) - (b.consultation_fee || 0);
      // Note: distance would require geolocation which we don't have
      default:
        return 0;
    }
  });

  return {
    providers: sortedProviders,
    loading,
    error,
    favorites,
    sortBy,
    category,
    searchTerm,
    setSortBy,
    setCategory,
    setSearchTerm,
    toggleFavorite
  };
};