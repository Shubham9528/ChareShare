/*
  # Fix Provider RLS Policies

  1. Security Updates
    - Add INSERT policy for providers table to allow users to create their own provider profile
    - This fixes the "new row violates row-level security policy for table providers" error

  2. Changes
    - Add a new RLS policy that allows authenticated users to insert their own provider profile
*/

-- Add INSERT policy for providers table
CREATE POLICY "Providers can insert own profile"
  ON providers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);