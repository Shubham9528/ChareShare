import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, UserProfile, dbService } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userType: 'provider' | 'patient', fullName: string, phone?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithPhone: (phone: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (error) {
          console.error('AuthProvider: Error getting session:', error);
          setLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          console.error('AuthProvider: Error initializing auth:', error);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth event:', event, 'Session:', session?.user?.id);

      switch (event) {
        case 'SIGNED_OUT':
          setSession(null);
          setUser(null);
          setProfile(null);
          setLoading(false);
          // Clear stored user type on sign out
          localStorage.removeItem('selectedUserType');
          break;
          
        case 'SIGNED_IN':
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            // Get stored user type from localStorage (set during provider/patient selection)
            const storedUserType = localStorage.getItem('selectedUserType');
            console.log('Stored user type:', storedUserType);
            
            // Create basic profile immediately for faster UX
            const basicProfile: UserProfile = {
              id: session.user.id,
              user_type: storedUserType as 'provider' | 'patient' || session.user.user_metadata?.user_type || 'patient',
              full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              phone: session.user.user_metadata?.phone || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            
            console.log('Setting basic profile:', basicProfile);
            setProfile(basicProfile);
            setLoading(false);
            
            // Fetch real profile in background and update if needed
            fetchUserProfile(session.user.id, false, storedUserType as 'provider' | 'patient');
          } else {
            setLoading(false);
          }
          break;
          
        case 'TOKEN_REFRESHED':
          setSession(session);
          setUser(session?.user ?? null);
          if (!profile && session?.user) {
            await fetchUserProfile(session.user.id);
          }
          break;
          
        default:
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchUserProfile(session.user.id);
          } else {
            setProfile(null);
            setLoading(false);
          }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string, setLoadingState = true, preferredUserType?: 'provider' | 'patient') => {
    try {
      if (setLoadingState) setLoading(true);
      
      // Wait a bit for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('AuthProvider: Error fetching user profile:', error);
        // If profile doesn't exist, the trigger should have created it, so try again
        if (error.code === 'PGRST116') {
          await new Promise(resolve => setTimeout(resolve, 2000));
          const { data: retryData, error: retryError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();
          
          if (retryError) {
            await createFallbackProfile(userId, setLoadingState, preferredUserType);
          } else {
            setProfile(retryData as UserProfile);
            if (setLoadingState) setLoading(false);
          }
        } else {
          await createFallbackProfile(userId, setLoadingState, preferredUserType);
        }
      } else if (!data) {
        // No profile found, create a fallback
        await createFallbackProfile(userId, setLoadingState, preferredUserType);
      } else {
        // Profile found, but check if we need to update user_type based on stored preference
        const existingProfile = data as UserProfile;
        const storedUserType = localStorage.getItem('selectedUserType');
        
        if (storedUserType && existingProfile.user_type !== storedUserType) {
          console.log('Updating profile user_type from', existingProfile.user_type, 'to', storedUserType);
          // Update the profile with the correct user type
          const { data: updatedData, error: updateError } = await supabase
            .from('user_profiles')
            .update({ 
              user_type: storedUserType as 'provider' | 'patient',
              updated_at: new Date().toISOString()
            })
            .eq('id', userId)
            .select();

          if (updateError) {
            console.error('Error updating user type:', updateError);
            setProfile(existingProfile);
          } else if (updatedData && updatedData.length > 0) {
            setProfile(updatedData[0] as UserProfile);
          } else {
            setProfile(existingProfile);
          }
        } else {
          setProfile(existingProfile);
        }
        
        if (setLoadingState) setLoading(false);
      }
    } catch (error) {
      console.error('AuthProvider: Error fetching user profile:', error);
      await createFallbackProfile(userId, setLoadingState, preferredUserType);
    }
  };

  const createFallbackProfile = async (userId: string, setLoadingState = true, preferredUserType?: 'provider' | 'patient') => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      // Check for stored user type from OAuth flow or use preferred type
      const storedUserType = localStorage.getItem('selectedUserType');
      const userType = preferredUserType || storedUserType as 'provider' | 'patient' || userData.user?.user_metadata?.user_type || 'patient';
      
      const fallbackProfile: UserProfile = {
        id: userId,
        user_type: userType,
        full_name: userData.user?.user_metadata?.full_name || userData.user?.email?.split('@')[0] || 'User',
        email: userData.user?.email || '',
        phone: userData.user?.user_metadata?.phone || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('Creating fallback profile:', fallbackProfile);
      setProfile(fallbackProfile);
    } catch (error) {
      console.error('AuthProvider: Error creating fallback profile:', error);
      setProfile(null);
    } finally {
      if (setLoadingState) setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userType: 'provider' | 'patient', 
    fullName: string,
    phone?: string
  ) => {
    try {
      console.log('Signing up user with type:', userType);
      
      // Store user type for later use
      localStorage.setItem('selectedUserType', userType);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType,
            phone: phone || null,
          }
        }
      });

      if (error) {
        console.error('AuthProvider: Sign up error:', error);
        return { error };
      }

      console.log('Sign up successful, user metadata:', data.user?.user_metadata);
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Sign up error:', error);
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('AuthProvider: Sign in error:', error);
      }
      
      return { error };
    } catch (error) {
      console.error('AuthProvider: Sign in error:', error);
      return { error: error as AuthError };
    }
  };

  const signInWithPhone = async (phone: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        phone,
        password,
      });
      
      if (error) {
        console.error('AuthProvider: Phone sign in error:', error);
      }
      
      return { error };
    } catch (error) {
      console.error('AuthProvider: Phone sign in error:', error);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      // Clear state immediately for faster UX
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Clear any stored user type preference
      localStorage.removeItem('selectedUserType');
      
      // Attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        // Check if the error is due to an expired/missing session
        if (error.message?.includes('Session from session_id claim in JWT does not exist') || 
            error.message?.includes('session_not_found') ||
            error.message?.includes('Auth session missing')) {
          // Session is already invalid on the server, so logout is effectively successful
          console.log('Session already expired on server, logout completed locally');
          return { error: null };
        }
        
        console.error('AuthProvider: Sign out error:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Unexpected sign out error:', error);
      
      // Check if it's a session-related error
      const errorMessage = (error as Error)?.message || '';
      if (errorMessage.includes('Session from session_id claim in JWT does not exist') || 
          errorMessage.includes('session_not_found') ||
          errorMessage.includes('Auth session missing')) {
        // Session is already invalid, treat as successful logout
        console.log('Session already expired, logout completed locally');
        return { error: null };
      }
      
      return { error: error as AuthError };
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Use the current origin as the redirect URL
      const redirectTo = `${window.location.origin}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo
        }
      });
      
      if (error) {
        console.error('AuthProvider: Google sign in error:', error);
      }
      
      return { error };
    } catch (error) {
      console.error('AuthProvider: Google sign in error:', error);
      return { error: error as AuthError };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) {
        return { error: new Error('No user logged in') };
      }

      const { error } = await dbService.updateUserProfile(user.id, updates);

      if (error) {
        console.error('AuthProvider: Profile update error:', error);
        return { error: new Error(error.message) };
      }

      // Refresh profile
      await fetchUserProfile(user.id, false);
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Profile update error:', error);
      return { error: error as Error };
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signInWithPhone,
    signOut,
    signInWithGoogle,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};