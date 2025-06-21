import { useState } from 'react';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

interface MedicalItem {
  id: string;
  name: string;
  severity?: string;
  dosage?: string;
  frequency?: string;
  type?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

export const usePatientProfile = () => {
  const [bloodType, setBloodType] = useState('A+');
  
  // Emergency Contacts
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'John Smith',
      relationship: 'Spouse',
      phone: '(555) 123-4567'
    }
  ]);

  // Medical Information
  const [allergies, setAllergies] = useState<MedicalItem[]>([
    { id: '1', name: 'Penicillin', severity: 'severe' },
    { id: '2', name: 'Shellfish', severity: 'moderate' }
  ]);

  const [medications, setMedications] = useState<MedicalItem[]>([
    { id: '1', name: 'Lisinopril', dosage: '10mg daily', frequency: 'Once daily' },
    { id: '2', name: 'Metformin', dosage: '500mg twice daily', frequency: 'Twice daily' }
  ]);

  const [medicalConditions, setMedicalConditions] = useState<MedicalItem[]>([
    { id: '1', name: 'Hypertension', type: 'chronic' },
    { id: '2', name: 'Type 2 Diabetes', type: 'chronic' }
  ]);

  // Documents
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Medical History.pdf', type: 'Medical History', uploadDate: '2024-01-15' },
    { id: '2', name: 'Lab Results.pdf', type: 'Lab Results', uploadDate: '2024-01-10' }
  ]);

  // Handlers
  const addEmergencyContact = (contact: Omit<EmergencyContact, 'id'>) => {
    const newContact = {
      id: Date.now().toString(),
      ...contact
    };
    setEmergencyContacts(prev => [...prev, newContact]);
  };

  const addMedicalItem = (
    type: 'allergy' | 'medication' | 'condition',
    item: Omit<MedicalItem, 'id'>
  ) => {
    const newItem = {
      id: Date.now().toString(),
      ...item
    };

    switch (type) {
      case 'allergy':
        setAllergies(prev => [...prev, newItem]);
        break;
      case 'medication':
        setMedications(prev => [...prev, newItem]);
        break;
      case 'condition':
        setMedicalConditions(prev => [...prev, newItem]);
        break;
    }
  };

  const addDocument = (doc: Omit<Document, 'id'>) => {
    const newDocument = {
      id: Date.now().toString(),
      ...doc
    };
    setDocuments(prev => [...prev, newDocument]);
  };

  const deleteItem = (type: 'contact' | 'allergy' | 'medication' | 'condition' | 'document', id: string) => {
    switch (type) {
      case 'contact':
        setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
        break;
      case 'allergy':
        setAllergies(prev => prev.filter(allergy => allergy.id !== id));
        break;
      case 'medication':
        setMedications(prev => prev.filter(medication => medication.id !== id));
        break;
      case 'condition':
        setMedicalConditions(prev => prev.filter(condition => condition.id !== id));
        break;
      case 'document':
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        break;
    }
  };

  return {
    // States
    bloodType,
    emergencyContacts,
    allergies,
    medications,
    medicalConditions,
    documents,

    // Setters
    setBloodType,
    
    // Actions
    addEmergencyContact,
    addMedicalItem,
    addDocument,
    deleteItem
  };
}; 