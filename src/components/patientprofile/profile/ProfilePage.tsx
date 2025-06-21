import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { QRCodeSection } from './QRCodeSection';
import { ProfileSection } from './ProfileSection';
import { EmergencyContact } from './EmergencyContact';
import { MedicalItem } from './MedicalItem';
import { AddContactModal } from './AddContactModal';
import { AddMedicalItemModal } from './AddMedicalItemModal';
import { EditBloodTypeModal } from './EditBloodTypeModal';
import { DocumentUploadModal } from './DocumentUploadModal';
import { usePatientProfile } from '../../../hooks/usePatientProfile';
import { usePatientNavigation } from '../../../hooks/usePatientNavigation';

interface ProfilePageProps {
  onBack?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const {
    bloodType,
    emergencyContacts,
    allergies,
    medications,
    medicalConditions,
    documents,
    setBloodType,
    addEmergencyContact,
    addMedicalItem,
    addDocument,
    deleteItem
  } = usePatientProfile();

  // const { activeNavTab, handleTabChange } = usePatientNavigation(!!user);

  // Modal states
  const [showAddContact, setShowAddContact] = React.useState(false);
  const [showAddAllergy, setShowAddAllergy] = React.useState(false);
  const [showAddMedication, setShowAddMedication] = React.useState(false);
  const [showAddCondition, setShowAddCondition] = React.useState(false);
  const [showEditBloodType, setShowEditBloodType] = React.useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = React.useState(false);
  const [showShareOptions, setShowShareOptions] = React.useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleMenuClick = () => {
    navigate('/patient/profile/setting');
  };

  const handleAddItem = (type: string) => {
    switch (type) {
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

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
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

        {/* Main Content */}
        <div className="p-4 space-y-4">
          {/* QR Code Section */}
          <QRCodeSection
            onShare={() => setShowShareOptions(true)}
            onAction={(action) => {
              if (action === 'share') {
                setShowShareOptions(true);
              }
            }}
          />

          {/* Emergency Contacts */}
          <ProfileSection
            title="Emergency Contacts"
            onAdd={() => handleAddItem('contact')}
          >
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <EmergencyContact
                  key={contact.id}
                  contact={contact}
                  onDelete={() => deleteItem('contact', contact.id)}
                />
              ))}
            </div>
          </ProfileSection>

          {/* Blood Type */}
          <ProfileSection
            title="Blood Type"
            onEdit={() => setShowEditBloodType(true)}
          >
            <div className="p-2">
              <span className="text-2xl font-bold text-gray-900">{bloodType}</span>
            </div>
          </ProfileSection>

          {/* Allergies */}
          <ProfileSection
            title="Allergies"
            onAdd={() => handleAddItem('allergy')}
          >
            <div className="space-y-3">
              {allergies.map((allergy) => (
                <MedicalItem
                  key={allergy.id}
                  icon="⚠️"
                  name={allergy.name}
                  severity={allergy.severity}
                  onDelete={() => deleteItem('allergy', allergy.id)}
                />
              ))}
            </div>
          </ProfileSection>

          {/* Medications */}
          <ProfileSection
            title="Current Medications"
            onAdd={() => handleAddItem('medication')}
          >
            <div className="space-y-3">
              {medications.map((medication) => (
                <MedicalItem
                  key={medication.id}
                  icon="💊"
                  name={medication.name}
                  dosage={medication.dosage}
                  frequency={medication.frequency}
                  onDelete={() => deleteItem('medication', medication.id)}
                />
              ))}
            </div>
          </ProfileSection>

          {/* Medical Conditions */}
          <ProfileSection
            title="Medical Conditions"
            onAdd={() => handleAddItem('condition')}
          >
            <div className="space-y-3">
              {medicalConditions.map((condition) => (
                <MedicalItem
                  key={condition.id}
                  icon={condition.name.includes('Hypertension') ? '❤️' : '🔵'}
                  name={condition.name}
                  type={condition.type}
                  onDelete={() => deleteItem('condition', condition.id)}
                />
              ))}
            </div>
          </ProfileSection>

          {/* Medical Documents */}
          <ProfileSection
            title="Medical Documents"
            onAdd={() => handleAddItem('document')}
          >
            <div className="space-y-3">
              {documents.map((doc) => (
                <MedicalItem
                  key={doc.id}
                  icon="📄"
                  name={doc.name}
                  type={doc.type}
                  date={doc.uploadDate}
                  onDelete={() => deleteItem('document', doc.id)}
                />
              ))}
            </div>
          </ProfileSection>
        </div>
      </div>

      {/* Modals */}
      <AddContactModal
        isOpen={showAddContact}
        onClose={() => setShowAddContact(false)}
        onAdd={addEmergencyContact}
      />

      <AddMedicalItemModal
        isOpen={showAddAllergy}
        onClose={() => setShowAddAllergy(false)}
        onAdd={(item) => addMedicalItem('allergy', item)}
        type="allergy"
        title="Add Allergy"
      />

      <AddMedicalItemModal
        isOpen={showAddMedication}
        onClose={() => setShowAddMedication(false)}
        onAdd={(item) => addMedicalItem('medication', item)}
        type="medication"
        title="Add Medication"
      />

      <AddMedicalItemModal
        isOpen={showAddCondition}
        onClose={() => setShowAddCondition(false)}
        onAdd={(item) => addMedicalItem('condition', item)}
        type="condition"
        title="Add Medical Condition"
      />

      <EditBloodTypeModal
        isOpen={showEditBloodType}
        onClose={() => setShowEditBloodType(false)}
        onUpdate={setBloodType}
        currentBloodType={bloodType}
      />

      <DocumentUploadModal
        isOpen={showDocumentUpload}
        onClose={() => setShowDocumentUpload(false)}
        onUpload={addDocument}
      />
    </>
  );
};