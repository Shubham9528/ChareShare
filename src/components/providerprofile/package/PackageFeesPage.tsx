import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EditPackagePopup } from './EditPackagePopup';
import { AddPackagePopup } from './AddPackagePopup';
import { useProviderProfile } from '../../../hooks/useProviderProfile';
import { ProviderPackage } from '../../../lib/supabase';

export const PackageFeesPage: React.FC = () => {
  const navigate = useNavigate();
  const { packages, loading, addPackage, updatePackage, deletePackage } = useProviderProfile();
  
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ProviderPackage | null>(null);

  const handleBack = () => {
    navigate('/provider/setting');
  };

  const handleEdit = (packageId: string) => {
    const packageToEdit = packages.find(pkg => pkg.id === packageId);
    if (packageToEdit) {
      setSelectedPackage(packageToEdit);
      setShowEditPopup(true);
    }
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setSelectedPackage(null);
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleSavePackage = async (updatedPackage: ProviderPackage) => {
    try {
      await updatePackage(updatedPackage.id, updatedPackage);
      setShowEditPopup(false);
      setSelectedPackage(null);
    } catch (error) {
      console.error('Failed to update package:', error);
      alert('Failed to update package. Please try again.');
    }
  };

  const handleAddPackage = () => {
    setShowAddPopup(true);
  };

  const handleSaveNewPackage = async (newPackageData: Omit<ProviderPackage, 'id' | 'provider_id' | 'created_at' | 'updated_at'>) => {
    try {
      await addPackage(newPackageData);
      setShowAddPopup(false);
    } catch (error) {
      console.error('Failed to add package:', error);
      alert('Failed to add package. Please try again.');
    }
  };

  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'voice':
        return '📞';
      case 'video':
        return '📹';
      case 'message':
        return '💬';
      case 'in-person':
        return '👤';
      default:
        return '📦';
    }
  };

  // Group packages by type
  const groupedPackages = packages.reduce((acc, pkg) => {
    if (!acc[pkg.package_type]) {
      acc[pkg.package_type] = [];
    }
    acc[pkg.package_type].push(pkg);
    return acc;
  }, {} as Record<string, ProviderPackage[]>);

  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'voice':
        return 'Voice Call';
      case 'video':
        return 'Video Call';
      case 'message':
        return 'Message';
      case 'in-person':
        return 'In-Person';
      default:
        return type;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">
              Package Fees
            </h1>
            
            {/* Empty div for spacing */}
            <div className="w-10"></div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 py-6 pb-24 space-y-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : Object.keys(groupedPackages).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No packages yet</h3>
              <p className="text-gray-600 mb-6">Add your first package to start offering services</p>
              <button
                onClick={handleAddPackage}
                className="py-3 px-6 text-white font-medium rounded-xl transition-all duration-200 inline-flex items-center space-x-2"
                style={{
                  background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
                }}
              >
                <Plus className="w-5 h-5" />
                <span>Add Package</span>
              </button>
            </div>
          ) : (
            Object.entries(groupedPackages).map(([type, items]) => (
              <div key={type} className="space-y-4">
                {/* Section Title */}
                <h2 className="text-xl font-semibold text-gray-900">
                  {getSectionTitle(type)}
                </h2>

                {/* Package Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
                    >
                      {/* Left Side - Icon and Details */}
                      <div className="flex items-center space-x-4">
                        {/* Price Badge */}
                        <div 
                          className="w-16 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
                          }}
                        >
                          ${item.price}
                        </div>

                        {/* Package Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {item.duration}
                          </p>
                        </div>
                      </div>

                      {/* Right Side - Edit Button */}
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-blue-600 font-semibold hover:underline focus:outline-none focus:underline transition-colors duration-200"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Add Button */}
        <button
          onClick={handleAddPackage}
          className="fixed bottom-6 right-6 w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200 z-40"
          style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
          }}
        >
          <Plus className="w-6 h-6 mx-auto" />
        </button>
      </div>

      {/* Edit Package Popup */}
      <EditPackagePopup
        isOpen={showEditPopup}
        onClose={handleCloseEditPopup}
        onSave={handleSavePackage}
        packageData={selectedPackage}
      />

      {/* Add Package Popup */}
      <AddPackagePopup
        isOpen={showAddPopup}
        onClose={handleCloseAddPopup}
        onSave={handleSaveNewPackage}
      />
    </>
  );
};