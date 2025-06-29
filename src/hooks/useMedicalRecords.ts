import { useState, useEffect } from 'react';
import { dbService, MedicalRecord } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useMedicalRecords = () => {
  const { user } = useAuth();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch medical records
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      if (!user) {
        setMedicalRecords([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getMedicalRecords(user.id);
        setMedicalRecords(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching medical records:', err);
        setError(err as Error);
        setMedicalRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, [user]);

  // Add medical record
  const addMedicalRecord = async (record: { record_type: string; document_name: string; document_url?: string }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      const newRecord = await dbService.addMedicalRecord({
        patient_id: user.id,
        ...record,
        upload_date: new Date().toISOString()
      });
      
      setMedicalRecords(prev => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      console.error('Error adding medical record:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete medical record
  const deleteMedicalRecord = async (recordId: string) => {
    try {
      setLoading(true);
      await dbService.deleteMedicalRecord(recordId);
      
      setMedicalRecords(prev => prev.filter(record => record.id !== recordId));
      return true;
    } catch (err) {
      console.error('Error deleting medical record:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    medicalRecords,
    loading,
    error,
    addMedicalRecord,
    deleteMedicalRecord
  };
};