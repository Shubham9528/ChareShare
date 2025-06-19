import React, { useState } from 'react';
import { X, Droplets } from 'lucide-react';

interface EditBloodTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (bloodType: string) => void;
  currentBloodType: string;
}

export const EditBloodTypeModal: React.FC<EditBloodTypeModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  currentBloodType
}) => {
  const [selectedBloodType, setSelectedBloodType] = useState(currentBloodType);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(selectedBloodType);
  };

  const handleClose = () => {
    setSelectedBloodType(currentBloodType);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Droplets className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">Edit Blood Type</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blood Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select your blood type
            </label>
            <div className="grid grid-cols-4 gap-3">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedBloodType(type)}
                  className={`py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    selectedBloodType === type
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedBloodType === type ? {
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                  } : {}}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-blue-800 text-sm">
              <strong>Important:</strong> Make sure your blood type is accurate. This information 
              could be critical in emergency situations.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 text-white font-medium rounded-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)'
              }}
            >
              Update Blood Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};