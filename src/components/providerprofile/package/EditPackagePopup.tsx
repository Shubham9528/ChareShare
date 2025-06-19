import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface PackageData {
  id: string;
  type: 'voice' | 'video' | 'message';
  title: string;
  price: number;
  duration: string;
}

interface EditPackagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (packageData: PackageData) => void;
  packageData: PackageData | null;
}

export const EditPackagePopup: React.FC<EditPackagePopupProps> = ({
  isOpen,
  onClose,
  onSave,
  packageData
}) => {
  const [formData, setFormData] = useState({
    price: '',
    service: 'voice' as 'voice' | 'video' | 'message',
    duration: '25 mint - 30 mint'
  });

  const [isSaving, setIsSaving] = useState(false);

  // Update form data when packageData changes
  useEffect(() => {
    if (packageData) {
      setFormData({
        price: packageData.price.toString(),
        service: packageData.type,
        duration: packageData.duration
      });
    }
  }, [packageData]);

  const serviceOptions = [
    { value: 'voice', label: 'Voice Call', icon: '📞' },
    { value: 'video', label: 'Video Call', icon: '📹' },
    { value: 'message', label: 'Message', icon: '💬' }
  ];

  const durationOptions = [
    '15 mint - 20 mint',
    '20 mint - 25 mint',
    '25 mint - 30 mint',
    '30 mint - 35 mint',
    '35 mint - 40 mint',
    '40 mint - 45 mint',
    '45 mint - 50 mint',
    '50 mint - 55 mint',
    '55 mint - 60 mint'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!packageData || !formData.price.trim()) return;

    setIsSaving(true);

    // Simulate save operation
    setTimeout(() => {
      const updatedPackage: PackageData = {
        ...packageData,
        price: parseInt(formData.price),
        type: formData.service,
        title: serviceOptions.find(opt => opt.value === formData.service)?.label || packageData.title,
        duration: formData.duration
      };

      onSave(updatedPackage);
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    if (!isSaving) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white rounded-t-3xl px-6 py-8 mx-4 mb-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          {/* Handle Bar */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Package
            </h2>
            <button
              onClick={handleClose}
              disabled={isSaving}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Price Field */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-900">
                Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Enter price"
                  disabled={isSaving}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium text-gray-900 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Service Type Field */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-900">
                Service Type
              </label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  disabled={isSaving}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium text-gray-900 bg-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Duration Field */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-900">
                Duration
              </label>
              <div className="relative">
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  disabled={isSaving}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium text-gray-900 bg-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {durationOptions.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            {/* Cancel Button */}
            <button
              onClick={handleClose}
              disabled={isSaving}
              className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            
            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving || !formData.price.trim()}
              className="flex-1 py-4 px-6 text-white font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              style={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              {isSaving && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};