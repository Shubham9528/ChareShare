/*
  # Fix User Profiles Authentication Issues

  1. Database Schema Fixes
    - Remove invalid foreign key constraint to non-existent users table
    - Add proper foreign key constraint to auth.users
    - Fix RLS policies to use correct auth.uid() function
    - Add missing INSERT policy for user profile creation

  2. Security Updates
    - Enable RLS on user_profiles table
    - Add proper policies for authenticated users to manage their profiles
    - Fix policy expressions to use auth.uid() instead of uid()

  3. Trigger Functions
    - Ensure proper trigger functions exist for profile management
*/

-- First, drop the existing foreign key constraint that references non-existent users table
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

-- Add proper foreign key constraint to auth.users
ALTER TABLE user_profiles 
ADD CONSTRAINT user_profiles_id_fkey 
FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing policies that use incorrect uid() function
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Create correct RLS policies using auth.uid()
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Ensure RLS is enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create or replace the handle_new_user function for automatic profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (
    id,
    user_type,
    full_name,
    email,
    phone
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'patient'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update existing trigger functions to use correct function names
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure the updated_at trigger exists
DROP TRIGGER IF EXISTS handle_updated_at ON user_profiles;
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();