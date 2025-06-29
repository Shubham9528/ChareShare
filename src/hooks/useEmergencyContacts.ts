import { useState, useEffect } from 'react';
import { dbService, EmergencyContact } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useEmergencyContacts = () => {
  const { user } = useAuth();
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch emergency contacts
  useEffect(() => {
    const fetchEmergencyContacts = async () => {
      if (!user) {
        setEmergencyContacts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await dbService.getEmergencyContacts(user.id);
        setEmergencyContacts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching emergency contacts:', err);
        setError(err as Error);
        setEmergencyContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyContacts();
  }, [user]);

  // Add emergency contact
  const addEmergencyContact = async (contact: { name: string; relationship: string; phone: string }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      const newContact = await dbService.addEmergencyContact({
        patient_id: user.id,
        ...contact
      });
      
      setEmergencyContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (err) {
      console.error('Error adding emergency contact:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete emergency contact
  const deleteEmergencyContact = async (contactId: string) => {
    try {
      setLoading(true);
      await dbService.deleteEmergencyContact(contactId);
      
      setEmergencyContacts(prev => prev.filter(contact => contact.id !== contactId));
      return true;
    } catch (err) {
      console.error('Error deleting emergency contact:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    emergencyContacts,
    loading,
    error,
    addEmergencyContact,
    deleteEmergencyContact
  };
};