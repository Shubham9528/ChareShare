import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, Edit, Plus, ChevronRight, Copy, Share, Download, Upload, Camera, X, Check } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSection } from './QRCodeSection';
import { ProfileSection } from './ProfileSection';
import { EmergencyContact } from './EmergencyContact';
import { MedicalItem } from './MedicalItem';
import { AddContactModal } from './AddContactModal';
import { AddMedicalItemModal } from './AddMedicalItemModal';
import { EditBloodTypeModal } from './EditBloodTypeModal';
import { DocumentUploadModal } from './DocumentUploadModal';
import { usePatientProfile } from '../../../hooks/usePatientProfile';
import { useEmergencyContacts } from '../../../hooks/useEmergencyContacts';
import { useMedicalRecords } from '../../../hooks/useMedicalRecords';
import { dbService } from '../../../lib/supabase';

interface ProfilePageProps {
  onBack?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavTab, setActiveNavTab] = useState('profile');
  
  const {
    patientProfile,
    loading: profileLoading,
    updatePatientProfile
  } = usePatientProfile();
  
  const {
    emergencyContacts,
    loading: contactsLoading,
    addEmergencyContact,
    deleteEmergencyContact
  } = useEmergencyContacts();
  
  const {
    medicalRecords,
    loading: recordsLoading,
    addMedicalRecord,
    deleteMedicalRecord
  } = useMedicalRecords();
  
  // State for UI elements
  const [bloodType, setBloodType] = useState(patientProfile?.blood_type || 'A+');
  
  // Modal states
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [showEditBloodType, setShowEditBloodType] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Data states
  const [allergies, setAllergies] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [medicalConditions, setMedicalConditions] = useState<any[]>([]);

  // Update blood type from patient profile
  useEffect(() => {
    if (patientProfile?.blood_type) {
      setBloodType(patientProfile.blood_type);
    }
  }, [patientProfile]);

  // Parse medical history and allergies from patient profile
  useEffect(() => {
    if (patientProfile) {
      // Parse allergies
      if (patientProfile.allergies) {
        try {
          const parsedAllergies = JSON.parse(patientProfile.allergies);
          if (Array.isArray(parsedAllergies)) {
            setAllergies(parsedAllergies);
          }
        } catch (e) {
          console.error('Failed to parse allergies:', e);
          // If allergies is a string, create a single allergy item
          setAllergies([{ 
            id: '1', 
            name: patientProfile.allergies, 
            severity: 'moderate' 
          }]);
        }
      }

      // Parse medical history for conditions and medications
      if (patientProfile.medical_history) {
        try {
          const parsedHistory = JSON.parse(patientProfile.medical_history);
          if (parsedHistory.conditions && Array.isArray(parsedHistory.conditions)) {
            setMedicalConditions(parsedHistory.conditions);
          }
          if (parsedHistory.medications && Array.isArray(parsedHistory.medications)) {
            setMedications(parsedHistory.medications);
          }
        } catch (e) {
          console.error('Failed to parse medical history:', e);
          // If medical_history is a string, create a single condition
          setMedicalConditions([{ 
            id: '1', 
            name: patientProfile.medical_history, 
            type: 'chronic' 
          }]);
        }
      }
    }
  }, [patientProfile]);

  const handleQRAction = (action: 'copy' | 'share' | 'download') => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        alert('Emergency info link copied to clipboard!');
        break;
      case 'share':
        setShowShareOptions(true);
        break;
      case 'download':
        // Generate and download QR code
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        if (ctx) {
          ctx.fillStyle = '#3B82F6';
          ctx.fillRect(0, 0, 200, 200);
          ctx.fillStyle = 'white';
          ctx.font = '16px Arial';
          ctx.fillText('Emergency QR', 50, 100);
        }
        const link = document.createElement('a');
        link.download = 'emergency-qr-code.png';
        link.href = canvas.toDataURL();
        link.click();
        break;
    }
  };

  const handleEditBloodType = () => {
    setShowEditBloodType(true);
  };

  const handleAddItem = (section: string) => {
    switch (section) {
      case 'contact':
        setShowAddContact(true);
        break;
      case 'allergy':
        setShowAddAllergy(true);
        break;
      case 'medication':
        setShowAddMedication(true);
        break;
      case 'condition':
        setShowAddCondition(true);
        break;
      case 'document':
        setShowDocumentUpload(true);
        break;
    }
  };

  const handleMenuClick = () => {
    navigate('/patient/profile/setting');
  };

  const handleBack = () => {
    navigate('/patient/profile/setting');
  };

  const handleTabChange = (tab: string) => {
    setActiveNavTab(tab);
    
    // Navigate to different routes based on tab
    const basePath = user ? '/patient' : '/browse';
    
    switch (tab) {
      case 'home':
        if (user) {
          navigate('/patient/category');
        } else {
          navigate('/browse');
        }
        break;
      case 'search':
        navigate(`${basePath}/search`);
        break;
      case 'booking':
        if (user) {
          navigate('/patient/bookings');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'message':
        if (user) {
          navigate('/patient/messages');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'profile':
        if (user) {
          
        } else {
          navigate('/login-selection');
        }
        break;
    }
  };

  // Determine current tab based on route
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/search')) {
      setActiveNavTab('search');
    } else if (path.includes('/booking')) {
      setActiveNavTab('booking');
    } else if (path.includes('/message')) {
      setActiveNavTab('message');
    } else if (path.includes('/profile') || path.includes('/setting')) {
      setActiveNavTab('profile');
    } else {
      setActiveNavTab('home');
    }
  }, [location.pathname]);

  // Add handlers for data operations
  const handleAddContact = async (contact: { name: string; relationship: string; phone: string }) => {
    try {
      await addEmergencyContact(contact);
      setShowAddContact(false);
    } catch (error) {
      console.error('Failed to add contact:', error);
      alert('Failed to add contact. Please try again.');
    }
  };

  const handleAddAllergy = async (allergy: { name: string; severity: string }) => {
    try {
      const newAllergy = {
        id: Date.now().toString(),
        ...allergy
      };
      
      const updatedAllergies = [...allergies, newAllergy];
      setAllergies(updatedAllergies);
      
      // Update patient profile
      await updatePatientProfile({
        allergies: JSON.stringify(updatedAllergies)
      });
      
      setShowAddAllergy(false);
    } catch (error) {
      console.error('Failed to add allergy:', error);
      alert('Failed to add allergy. Please try again.');
    }
  };

  const handleAddMedication = async (medication: { name: string; dosage: string; frequency: string }) => {
    try {
      const newMedication = {
        id: Date.now().toString(),
        ...medication
      };
      
      const updatedMedications = [...medications, newMedication];
      setMedications(updatedMedications);
      
      // Update patient profile
      const currentHistory = patientProfile?.medical_history ? JSON.parse(patientProfile.medical_history) : {};
      const updatedHistory = {
        ...currentHistory,
        medications: updatedMedications,
        conditions: medicalConditions
      };
      
      await updatePatientProfile({
        medical_history: JSON.stringify(updatedHistory)
      });
      
      setShowAddMedication(false);
    } catch (error) {
      console.error('Failed to add medication:', error);
      alert('Failed to add medication. Please try again.');
    }
  };

  const handleAddCondition = async (condition: { name: string; type: string }) => {
    try {
      const newCondition = {
        id: Date.now().toString(),
        ...condition
      };
      
      const updatedConditions = [...medicalConditions, newCondition];
      setMedicalConditions(updatedConditions);
      
      // Update patient profile
      const currentHistory = patientProfile?.medical_history ? JSON.parse(patientProfile.medical_history) : {};
      const updatedHistory = {
        ...currentHistory,
        conditions: updatedConditions,
        medications: medications
      };
      
      await updatePatientProfile({
        medical_history: JSON.stringify(updatedHistory)
      });
      
      setShowAddCondition(false);
    } catch (error) {
      console.error('Failed to add condition:', error);
      alert('Failed to add condition. Please try again.');
    }
  };

  const handleUpdateBloodType = async (newBloodType: string) => {
    try {
      await updatePatientProfile({ blood_type: newBloodType });
      setBloodType(newBloodType);
      setShowEditBloodType(false);
    } catch (error) {
      console.error('Failed to update blood type:', error);
      alert('Failed to update blood type. Please try again.');
    }
  };

  const handleDocumentUpload = async (document: { name: string; type: string; file: File }) => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // First upload the file to storage
      const path = `medical_records/${user.id}/${Date.now()}_${document.file.name}`;
      await dbService.uploadFile('documents', path, document.file);
      
      // Get the public URL
      const documentUrl = dbService.getFileUrl('documents', path);
      
      // Add the record to the database
      await addMedicalRecord({
        record_type: document.type,
        document_name: document.name,
        document_url: documentUrl
      });
      
      setShowDocumentUpload(false);
    } catch (error) {
      console.error('Failed to upload document:', error);
      alert('Failed to upload document. Please try again.');
    }
  };

  const handleShare = (platform: string) => {
    const shareText = `Check out my emergency medical information: ${window.location.href}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Emergency Medical Information&body=${encodeURIComponent(shareText)}`);
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(shareText)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText);
        alert('Share text copied to clipboard!');
        break;
    }
    setShowShareOptions(false);
  };

  const handleDeleteEmergencyContact = async (id: string) => {
    try {
      await deleteEmergencyContact(id);
    } catch (error) {
      console.error('Failed to delete contact:', error);
      alert('Failed to delete contact. Please try again.');
    }
  };

  const handleDeleteAllergy = async (id: string) => {
    try {
      const updatedAllergies = allergies.filter(item => item.id !== id);
      setAllergies(updatedAllergies);
      
      // Update patient profile
      await updatePatientProfile({
        allergies: JSON.stringify(updatedAllergies)
      });
    } catch (error) {
      console.error('Failed to delete allergy:', error);
      alert('Failed to delete allergy. Please try again.');
    }
  };

  const handleDeleteMedication = async (id: string) => {
    try {
      const updatedMedications = medications.filter(item => item.id !== id);
      setMedications(updatedMedications);
      
      // Update patient profile
      const currentHistory = patientProfile?.medical_history ? JSON.parse(patientProfile.medical_history) : {};
      const updatedHistory = {
        ...currentHistory,
        medications: updatedMedications,
        conditions: medicalConditions
      };
      
      await updatePatientProfile({
        medical_history: JSON.stringify(updatedHistory)
      });
    } catch (error) {
      console.error('Failed to delete medication:', error);
      alert('Failed to delete medication. Please try again.');
    }
  };

  const handleDeleteCondition = async (id: string) => {
    try {
      const updatedConditions = medicalConditions.filter(item => item.id !== id);
      setMedicalConditions(updatedConditions);
      
      // Update patient profile
      const currentHistory = patientProfile?.medical_history ? JSON.parse(patientProfile.medical_history) : {};
      const updatedHistory = {
        ...currentHistory,
        conditions: updatedConditions,
        medications: medications
      };
      
      await updatePatientProfile({
        medical_history: JSON.stringify(updatedHistory)
      });
    } catch (error) {
      console.error('Failed to delete condition:', error);
      alert('Failed to delete condition. Please try again.');
    }
  };

  const handleDeleteItem = (section: string, id: string) => {
    switch (section) {
      case 'contact':
        handleDeleteEmergencyContact(id);
        break;
      case 'allergy':
        handleDeleteAllergy(id);
        break;
      case 'medication':
        handleDeleteMedication(id);
        break;
      case 'condition':
        handleDeleteCondition(id);
        break;
      case 'document':
        deleteMedicalRecord(id).catch(err => {
          console.error('Failed to delete document:', err);
          alert('Failed to delete document. Please try again.');
        });
        break;
    }
  };

  if (profileLoading || contactsLoading || recordsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <h1 className="text-xl font-semibold text-gray-900">
              Emergency Info
            </h1>
            
            <button 
              onClick={handleMenuClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 py-6 space-y-6 pb-24">
          {/* QR Code Section */}
          <QRCodeSection onAction={handleQRAction} />

          {/* Blood Type */}
          <ProfileSection
            title="Blood Type"
            onEdit={handleEditBloodType}
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-red-600">{bloodType}</span>
            </div>
          </ProfileSection>

          {/* Emergency Contacts */}
          <ProfileSection
            title="Emergency Contacts"
            onAdd={() => handleAddItem('contact')}
          >
            <div className="space-y-3">
              {emergencyContacts.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No emergency contacts added yet
                </div>
              ) : (
                emergencyContacts.map((contact) => (
                  <EmergencyContact 
                    key={contact.id} 
                    contact={contact}
                    onDelete={() => handleDeleteItem('contact', contact.id)}
                  />
                ))
              )}
            </div>
          </ProfileSection>

          {/* Allergies */}
          <ProfileSection
            title="Allergies"
            onAdd={() => handleAddItem('allergy')}
          >
            <div className="space-y-3">
              {allergies.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No allergies added yet
                </div>
              ) : (
                allergies.map((allergy) => (
                  <MedicalItem
                    key={allergy.id}
                    icon="🚫"
                    name={allergy.name}
                    severity={allergy.severity}
                    onDelete={() => handleDeleteItem('allergy', allergy.id)}
                  />
                ))
              )}
            </div>
          </ProfileSection>

          {/* Current Medications */}
          <ProfileSection
            title="Current Medications"
            onAdd={() => handleAddItem('medication')}
          >
            <div className="space-y-3">
              {medications.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No medications added yet
                </div>
              ) : (
                medications.map((medication) => (
                  <MedicalItem
                    key={medication.id}
                    icon="💊"
                    name={medication.name}
                    dosage={medication.dosage}
                    showChevron
                    onDelete={() => handleDeleteItem('medication', medication.id)}
                  />
                ))
              )}
            </div>
          </ProfileSection>

          {/* Medical Conditions */}
          <ProfileSection
            title="Medical Conditions"
            onAdd={() => handleAddItem('condition')}
          >
            <div className="space-y-3">
              {medicalConditions.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No medical conditions added yet
                </div>
              ) : (
                medicalConditions.map((condition) => (
                  <MedicalItem
                    key={condition.id}
                    icon={condition.name.includes('Hypertension') ? '❤️' : '🔵'}
                    name={condition.name}
                    type={condition.type}
                    onDelete={() => handleDeleteItem('condition', condition.id)}
                  />
                ))
              )}
            </div>
          </ProfileSection>

          {/* Medical Documents */}
          <ProfileSection
            title="Medical Documents"
            onAdd={() => handleAddItem('document')}
          >
            <div className="space-y-3">
              {medicalRecords.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No medical documents uploaded yet
                </div>
              ) : (
                medicalRecords.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{document.document_name}</h3>
                        <p className="text-sm text-gray-600">{document.record_type} • {new Date(document.upload_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {document.document_url && (
                        <a
                          href={document.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteItem('document', document.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ProfileSection>
        </div>
      </div>

      {/* Modals */}
      <AddContactModal
        isOpen={showAddContact}
        onClose={() => setShowAddContact(false)}
        onAdd={handleAddContact}
      />

      <AddMedicalItemModal
        isOpen={showAddAllergy}
        onClose={() => setShowAddAllergy(false)}
        onAdd={handleAddAllergy}
        type="allergy"
        title="Add Allergy"
      />

      <AddMedicalItemModal
        isOpen={showAddMedication}
        onClose={() => setShowAddMedication(false)}
        onAdd={handleAddMedication}
        type="medication"
        title="Add Medication"
      />

      <AddMedicalItemModal
        isOpen={showAddCondition}
        onClose={() => setShowAddCondition(false)}
        onAdd={handleAddCondition}
        type="condition"
        title="Add Medical Condition"
      />

      <EditBloodTypeModal
        isOpen={showEditBloodType}
        onClose={() => setShowEditBloodType(false)}
        onUpdate={handleUpdateBloodType}
        currentBloodType={bloodType}
      />

      <DocumentUploadModal
        isOpen={showDocumentUpload}
        onClose={() => setShowDocumentUpload(false)}
        onUpload={handleDocumentUpload}
      />

      {/* Share Options Modal */}
      {showShareOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Share Emergency Info</h3>
              <button
                onClick={() => setShowShareOptions(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">W</span>
                </div>
                <span className="font-medium text-gray-900">WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleShare('email')}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">@</span>
                </div>
                <span className="font-medium text-gray-900">Email</span>
              </button>
              
              <button
                onClick={() => handleShare('sms')}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">SMS</span>
                </div>
                <span className="font-medium text-gray-900">Text Message</span>
              </button>
              
              <button
                onClick={() => handleShare('copy')}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Copy className="w-5 h-5 text-gray-600" />
                </div>
                <span className="font-medium text-gray-900">Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};