import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EditPackagePopup } from './EditPackagePopup';
import { AddPackagePopup } from './AddPackagePopup';

interface PackageItem {
  id: string;
  type: 'voice' | 'video' | 'message';
  title: string;
  price: number;
  duration: string;
}

export const PackageFeesPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [packages, setPackages] = useState<PackageItem[]>([
    { id: '1', type: 'voice', title: 'Voice Call', price: 10, duration: '25 mint - 30 mint' },
    { id: '2', type: 'voice', title: 'Voice Call', price: 20, duration: '25 mint - 30 mint' },
    { id: '3', type: 'voice', title: 'Voice Call', price: 30, duration: '25 mint - 30 mint' },
    { id: '4', type: 'video', title: 'Video Call', price: 20, duration: '25 mint - 30 mint' },
    { id: '5', type: 'video', title: 'Video Call', price: 30, duration: '25 mint - 30 mint' },
    { id: '6', type: 'video', title: 'Video Call', price: 40, duration: '25 mint - 30 mint' },
    { id: '7', type: 'message', title: 'Message', price: 20, duration: '25 mint - 30 mint' },
  ]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

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

  const handleSavePackage = (updatedPackage: PackageItem) => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === updatedPackage.id ? updatedPackage : pkg
      )
    );
  };

  const handleAddPackage = () => {
    setShowAddPopup(true);
  };

  const handleSaveNewPackage = (newPackageData: Omit<PackageItem, 'id'>) => {
    const newPackage: PackageItem = {
      ...newPackageData,
      id: Date.now().toString() // Simple ID generation
    };
    
    setPackages(prev => [...prev, newPackage]);
  };

  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'voice':
        return '📞';
      case 'video':
        return '📹';
      case 'message':
        return '💬';
      default:
        return '📦';
    }
  };

  const groupedPackages = packages.reduce((acc, pkg) => {
    if (!acc[pkg.type]) {
      acc[pkg.type] = [];
    }
    acc[pkg.type].push(pkg);
    return acc;
  }, {} as Record<string, PackageItem[]>);

  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'voice':
        return 'Voice Call';
      case 'video':
        return 'Video Call';
      case 'message':
        return 'Message';
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
          {Object.entries(groupedPackages).map(([type, items]) => (
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
          ))}
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