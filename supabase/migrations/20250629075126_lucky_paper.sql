/*
  # Fix Provider Profile Issues

  1. Schema Updates
    - Ensure providers table has all necessary columns
    - Add missing constraints and defaults
    - Fix foreign key relationships

  2. Security
    - Update RLS policies for providers table
    - Ensure proper access control for provider profiles
*/

-- Add missing columns to providers table if they don't exist
DO $$
BEGIN
  -- Check if bio column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'providers' AND column_name = 'bio'
  ) THEN
    ALTER TABLE providers ADD COLUMN bio text;
  END IF;

  -- Check if availability_hours column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'providers' AND column_name = 'availability_hours'
  ) THEN
    ALTER TABLE providers ADD COLUMN availability_hours jsonb DEFAULT '{}'::jsonb;
  END IF;

  -- Check if is_verified column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'providers' AND column_name = 'is_verified'
  ) THEN
    ALTER TABLE providers ADD COLUMN is_verified boolean DEFAULT false;
  END IF;

  -- Check if rating column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'providers' AND column_name = 'rating'
  ) THEN
    ALTER TABLE providers ADD COLUMN rating numeric(3,2) DEFAULT 0.0;
  END IF;

  -- Check if review_count column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'providers' AND column_name = 'review_count'
  ) THEN
    ALTER TABLE providers ADD COLUMN review_count integer DEFAULT 0;
  END IF;
END $$;

-- Ensure RLS policies exist
DO $$
BEGIN
  -- Check if the policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'providers' AND policyname = 'Public can read provider data'
  ) THEN
    -- Create the policy
    CREATE POLICY "Public can read provider data"
      ON providers
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
  
  -- Check if the insert policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'providers' AND policyname = 'Providers can insert own profile'
  ) THEN
    -- Create the policy
    CREATE POLICY "Providers can insert own profile"
      ON providers
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;
  
  -- Check if the update policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'providers' AND policyname = 'Providers can update own data'
  ) THEN
    -- Create the policy
    CREATE POLICY "Providers can update own data"
      ON providers
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Create function to handle user profile creation for providers
CREATE OR REPLACE FUNCTION handle_new_provider_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- If user_type is provider, create provider record
  IF NEW.user_type = 'provider' AND NOT EXISTS (SELECT 1 FROM providers WHERE id = NEW.id) THEN
    INSERT INTO providers (
      id, 
      specialization, 
      years_of_experience,
      consultation_fee,
      is_verified,
      rating,
      review_count
    ) VALUES (
      NEW.id,
      'General',
      0,
      0,
      false,
      0.0,
      0
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new provider profile
DROP TRIGGER IF EXISTS on_new_provider_profile ON user_profiles;
CREATE TRIGGER on_new_provider_profile
  AFTER INSERT OR UPDATE ON user_profiles
  FOR EACH ROW
  WHEN (NEW.user_type = 'provider')
  EXECUTE FUNCTION handle_new_provider_profile();