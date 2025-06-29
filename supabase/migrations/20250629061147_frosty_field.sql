/*
  # Add Insurance Benefits Table

  1. New Tables
    - `insurance_benefits`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references patients)
      - `benefit_type` (text)
      - `provider_name` (text)
      - `policy_number` (text)
      - `total_amount` (integer)
      - `used_amount` (integer)
      - `renewal_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `insurance_benefits` table
    - Add policies for patients to manage their own insurance benefits
*/

-- Create insurance_benefits table
CREATE TABLE IF NOT EXISTS insurance_benefits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  benefit_type text NOT NULL,
  provider_name text NOT NULL,
  policy_number text,
  total_amount integer NOT NULL DEFAULT 0,
  used_amount integer NOT NULL DEFAULT 0,
  renewal_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE insurance_benefits ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Patients can read own insurance benefits"
  ON insurance_benefits
  FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Patients can insert own insurance benefits"
  ON insurance_benefits
  FOR INSERT
  TO authenticated
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Patients can update own insurance benefits"
  ON insurance_benefits
  FOR UPDATE
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Patients can delete own insurance benefits"
  ON insurance_benefits
  FOR DELETE
  TO authenticated
  USING (patient_id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER handle_insurance_benefits_updated_at
  BEFORE UPDATE ON insurance_benefits
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();