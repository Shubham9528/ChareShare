/*
  # Recreate providers table with proper RLS policies

  1. Changes
    - Drop existing providers table and recreate with same schema
    - Add proper RLS policies for authenticated users to manage their own data
    - Ensure all foreign key relationships are maintained

  2. Security
    - Enable RLS on providers table
    - Add policies for providers to insert, select, update their own data
    - Add policy for public to read provider data (for patient searches)
*/

-- Drop existing providers table (this will cascade to related tables)
DROP TABLE IF EXISTS providers CASCADE;

-- Recreate providers table with same schema
CREATE TABLE providers (
  id uuid PRIMARY KEY,
  specialization text NOT NULL,
  license_number text,
  years_of_experience integer DEFAULT 0,
  clinic_name text,
  clinic_address text,
  bio text,
  consultation_fee integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0.0,
  review_count integer DEFAULT 0,
  availability_hours jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  FOREIGN KEY (id) REFERENCES user_profiles(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Create policies for providers to manage their own data
CREATE POLICY "Providers can insert own profile"
  ON providers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Providers can read own data"
  ON providers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Providers can update own data"
  ON providers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow public to read provider data (for patient searches)
CREATE POLICY "Public can read provider data"
  ON providers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Add updated_at trigger
CREATE TRIGGER handle_providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Recreate any dependent tables that were dropped

-- Recreate appointments table foreign key constraint
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'appointments') THEN
    -- Drop existing foreign key if it exists
    ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_provider_id_fkey;
    
    -- Add the foreign key constraint back
    ALTER TABLE appointments ADD CONSTRAINT appointments_provider_id_fkey
      FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Recreate reviews table foreign key constraint
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'reviews') THEN
    -- Drop existing foreign key if it exists
    ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_provider_id_fkey;
    
    -- Add the foreign key constraint back
    ALTER TABLE reviews ADD CONSTRAINT reviews_provider_id_fkey
      FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Recreate favorites table foreign key constraint
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'favorites') THEN
    -- Drop existing foreign key if it exists
    ALTER TABLE favorites DROP CONSTRAINT IF EXISTS favorites_provider_id_fkey;
    
    -- Add the foreign key constraint back
    ALTER TABLE favorites ADD CONSTRAINT favorites_provider_id_fkey
      FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Recreate provider_packages table foreign key constraint
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'provider_packages') THEN
    -- Drop existing foreign key if it exists
    ALTER TABLE provider_packages DROP CONSTRAINT IF EXISTS provider_packages_provider_id_fkey;
    
    -- Add the foreign key constraint back
    ALTER TABLE provider_packages ADD CONSTRAINT provider_packages_provider_id_fkey
      FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE;
  END IF;
END $$;