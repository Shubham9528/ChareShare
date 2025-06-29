import { useState, useEffect } from 'react';
import { dbService, ProviderProfile, ProviderPackage } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useProviderProfile = (providerId?: string) => {
  const { user } = useAuth();
  const [providerProfile, setProviderProfile] = useState<ProviderProfile | null>(null);
  const [packages, setPackages] = useState<ProviderPackage[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Determine which ID to use
  const targetId = providerId || (user?.id || '');

  // Fetch provider profile
  useEffect(() => {
    const fetchProviderProfile = async () => {
      if (!targetId) {
        setProviderProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getProviderProfile(targetId);
        setProviderProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching provider profile:', err);
        setError(err as Error);
        // Set providerProfile to null if not found
        setProviderProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderProfile();
  }, [targetId]);

  // Fetch provider packages
  useEffect(() => {
    const fetchProviderPackages = async () => {
      if (!targetId) {
        setPackages([]);
        return;
      }

      try {
        const data = await dbService.getProviderPackages(targetId);
        setPackages(data);
      } catch (err) {
        console.error('Error fetching provider packages:', err);
      }
    };

    fetchProviderPackages();
  }, [targetId]);

  // Fetch provider reviews
  useEffect(() => {
    const fetchProviderReviews = async () => {
      if (!targetId) {
        setReviews([]);
        return;
      }

      try {
        const data = await dbService.getProviderReviews(targetId);
        setReviews(data);
      } catch (err) {
        console.error('Error fetching provider reviews:', err);
      }
    };

    fetchProviderReviews();
  }, [targetId]);

  // Update provider profile
  const updateProviderProfile = async (updates: Partial<ProviderProfile>) => {
    if (!user || !targetId) return;

    // Only allow updating if it's the user's own profile
    if (user.id !== targetId) {
      throw new Error('You can only update your own profile');
    }

    try {
      let updatedProfile;
      
      // If no provider profile exists, create one first
      if (!providerProfile) {
        updatedProfile = await dbService.addProviderProfile(targetId, updates);
      } else {
        updatedProfile = await dbService.updateProviderProfile(targetId, updates);
      }
      
      setProviderProfile(prev => prev ? { ...prev, ...updatedProfile } : updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error('Error updating provider profile:', err);
      throw err;
    }
  };

  // Add provider package
  const addPackage = async (packageData: Omit<ProviderPackage, 'id' | 'provider_id' | 'created_at' | 'updated_at'>) => {
    if (!user || !targetId) return;

    // Only allow adding if it's the user's own profile
    if (user.id !== targetId) {
      throw new Error('You can only add packages to your own profile');
    }

    try {
      const newPackage = await dbService.addProviderPackage({
        provider_id: targetId,
        ...packageData
      });
      setPackages(prev => [...prev, newPackage]);
      return newPackage;
    } catch (err) {
      console.error('Error adding provider package:', err);
      throw err;
    }
  };

  // Update provider package
  const updatePackage = async (packageId: string, updates: Partial<ProviderPackage>) => {
    if (!user || !targetId) return;

    // Only allow updating if it's the user's own profile
    if (user.id !== targetId) {
      throw new Error('You can only update your own packages');
    }

    try {
      const updatedPackage = await dbService.updateProviderPackage(packageId, updates);
      setPackages(prev => prev.map(pkg => pkg.id === packageId ? updatedPackage : pkg));
      return updatedPackage;
    } catch (err) {
      console.error('Error updating provider package:', err);
      throw err;
    }
  };

  // Delete provider package
  const deletePackage = async (packageId: string) => {
    if (!user || !targetId) return;

    // Only allow deleting if it's the user's own profile
    if (user.id !== targetId) {
      throw new Error('You can only delete your own packages');
    }

    try {
      await dbService.deleteProviderPackage(packageId);
      setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
      return true;
    } catch (err) {
      console.error('Error deleting provider package:', err);
      throw err;
    }
  };

  return {
    providerProfile,
    packages,
    reviews,
    loading,
    error,
    updateProviderProfile,
    addPackage,
    updatePackage,
    deletePackage
  };
};