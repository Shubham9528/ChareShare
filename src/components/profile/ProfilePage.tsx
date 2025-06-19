import React, { useState } from 'react';
import { ArrowLeft, Menu, Edit, Plus, ChevronRight, Copy, Share, Download, Upload, Camera, X, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSection } from './QRCodeSection';
import { ProfileSection } from './ProfileSection';
import { EmergencyContact } from './EmergencyContact';
import { MedicalItem } from './MedicalItem';
import { BottomNavigation } from '../category/BottomNavigation';
import { AddContactModal } from './AddContactModal';
import { AddMedicalItemModal } from './AddMedicalItemModal';
import { EditBloodTypeModal } from './EditBloodTypeModal';
import { DocumentUploadModal } from './DocumentUploadModal';

interface ProfilePageProps {
  onBack?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [bloodType, setBloodType] = useState('A+');
  const [activeNavTab, setActiveNavTab] = useState('profile');
  
  // Modal states
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [showEditBloodType, setShowEditBloodType] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Data states
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: '1',
      name: 'John Smith',
      relationship: 'Spouse',
      phone: '(555) 123-4567'
    }
  ]);

  const [allergies, setAllergies] = useState([
    { id: '1', name: 'Penicillin', severity: 'severe' },
    { id: '2', name: 'Shellfish', severity: 'moderate' }
  ]);

  const [medications, setMedications] = useState([
    { id: '1', name: 'Lisinopril', dosage: '10mg daily', frequency: 'Once daily' },
    { id: '2', name: 'Metformin', dosage: '500mg twice daily', frequency: 'Twice daily' }
  ]);

  const [medicalConditions, setMedicalConditions] = useState([
    { id: '1', name: 'Hypertension', type: 'chronic' },
    { id: '2', name: 'Type 2 Diabetes', type: 'chronic' }
  ]);

  const [documents, setDocuments] = useState([
    { id: '1', name: 'Medical History.pdf', type: 'Medical History', uploadDate: '2024-01-15' },
    { id: '2', name: 'Lab Results.pdf', type: 'Lab Results', uploadDate: '2024-01-10' }
  ]);

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
  const handleAddContact = (contact: { name: string; relationship: string; phone: string }) => {
    const newContact = {
      id: Date.now().toString(),
      ...contact
    };
    setEmergencyContacts(prev => [...prev, newContact]);
    setShowAddContact(false);
  };

  const handleAddAllergy = (allergy: { name: string; severity: string }) => {
    const newAllergy = {
      id: Date.now().toString(),
      ...allergy
    };
    setAllergies(prev => [...prev, newAllergy]);
    setShowAddAllergy(false);
  };

  const handleAddMedication = (medication: { name: string; dosage: string; frequency: string }) => {
    const newMedication = {
      id: Date.now().toString(),
      ...medication
    };
    setMedications(prev => [...prev, newMedication]);
    setShowAddMedication(false);
  };

  const handleAddCondition = (condition: { name: string; type: string }) => {
    const newCondition = {
      id: Date.now().toString(),
      ...condition
    };
    setMedicalConditions(prev => [...prev, newCondition]);
    setShowAddCondition(false);
  };

  const handleUpdateBloodType = (newBloodType: string) => {
    setBloodType(newBloodType);
    setShowEditBloodType(false);
  };

  const handleDocumentUpload = (document: { name: string; type: string; file: File }) => {
    const newDocument = {
      id: Date.now().toString(),
      name: document.name,
      type: document.type,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setDocuments(prev => [...prev, newDocument]);
    setShowDocumentUpload(false);
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

  const handleDeleteItem = (section: string, id: string) => {
    switch (section) {
      case 'contact':
        setEmergencyContacts(prev => prev.filter(item => item.id !== id));
        break;
      case 'allergy':
        setAllergies(prev => prev.filter(item => item.id !== id));
        break;
      case 'medication':
        setMedications(prev => prev.filter(item => item.id !== id));
        break;
      case 'condition':
        setMedicalConditions(prev => prev.filter(item => item.id !== id));
        break;
      case 'document':
        setDocuments(prev => prev.filter(item => item.id !== id));
        break;
    }
  };

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
              {emergencyContacts.map((contact) => (
                <EmergencyContact 
                  key={contact.id} 
                  contact={contact}
                  onDelete={() => handleDeleteItem('contact', contact.id)}
                />
              ))}
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
                  icon="🚫"
                  name={allergy.name}
                  severity={allergy.severity}
                  onDelete={() => handleDeleteItem('allergy', allergy.id)}
                />
              ))}
            </div>
          </ProfileSection>

          {/* Current Medications */}
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
                  showChevron
                  onDelete={() => handleDeleteItem('medication', medication.id)}
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
                  onDelete={() => handleDeleteItem('condition', condition.id)}
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
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{document.name}</h3>
                      <p className="text-sm text-gray-600">{document.type} • {document.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {/* Download document */}}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('document', document.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ProfileSection>
        </div>

        {/* Bottom Navigation */}
       
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