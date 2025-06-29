import { useState, useEffect } from 'react';
import { dbService, PatientProfile, EmergencyContact, MedicalRecord } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const usePatientProfile = () => {
  const { user } = useAuth();
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch patient profile
  useEffect(() => {
    const fetchPatientProfile = async () => {
      if (!user) {
        setPatientProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getPatientProfile(user.id);
        setPatientProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching patient profile:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientProfile();
  }, [user]);

  // Fetch emergency contacts
  useEffect(() => {
    const fetchEmergencyContacts = async () => {
      if (!user) {
        setEmergencyContacts([]);
        return;
      }

      try {
        const data = await dbService.getEmergencyContacts(user.id);
        setEmergencyContacts(data);
      } catch (err) {
        console.error('Error fetching emergency contacts:', err);
      }
    };

    fetchEmergencyContacts();
  }, [user]);

  // Fetch medical records
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      if (!user) {
        setMedicalRecords([]);
        return;
      }

      try {
        const data = await dbService.getMedicalRecords(user.id);
        setMedicalRecords(data);
      } catch (err) {
        console.error('Error fetching medical records:', err);
      }
    };

    fetchMedicalRecords();
  }, [user]);

  // Update patient profile
  const updatePatientProfile = async (updates: Partial<PatientProfile>) => {
    if (!user) return;

    try {
      const updatedProfile = await dbService.updatePatientProfile(user.id, updates);
      setPatientProfile(prev => prev ? { ...prev, ...updatedProfile } : updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error('Error updating patient profile:', err);
      throw err;
    }
  };

  // Add emergency contact
  const addEmergencyContact = async (contact: { name: string; relationship: string; phone: string }) => {
    if (!user) return;

    try {
      const newContact = await dbService.addEmergencyContact({
        patient_id: user.id,
        ...contact
      });
      setEmergencyContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (err) {
      console.error('Error adding emergency contact:', err);
      throw err;
    }
  };

  // Delete emergency contact
  const deleteEmergencyContact = async (contactId: string) => {
    try {
      await dbService.deleteEmergencyContact(contactId);
      setEmergencyContacts(prev => prev.filter(contact => contact.id !== contactId));
      return true;
    } catch (err) {
      console.error('Error deleting emergency contact:', err);
      throw err;
    }
  };

  // Add medical record
  const addMedicalRecord = async (record: { record_type: string; document_name: string; document_url?: string }) => {
    if (!user) return;

    try {
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
    }
  };

  // Delete medical record
  const deleteMedicalRecord = async (recordId: string) => {
    try {
      await dbService.deleteMedicalRecord(recordId);
      setMedicalRecords(prev => prev.filter(record => record.id !== recordId));
      return true;
    } catch (err) {
      console.error('Error deleting medical record:', err);
      throw err;
    }
  };

  return {
    patientProfile,
    emergencyContacts,
    medicalRecords,
    loading,
    error,
    updatePatientProfile,
    addEmergencyContact,
    deleteEmergencyContact,
    addMedicalRecord,
    deleteMedicalRecord
  };
};