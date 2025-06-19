import React, { useState } from 'react';
import { X, AlertTriangle, Pill, Heart } from 'lucide-react';

interface AddMedicalItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
  type: 'allergy' | 'medication' | 'condition';
  title: string;
}

export const AddMedicalItemModal: React.FC<AddMedicalItemModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  type,
  title
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getIcon = () => {
    switch (type) {
      case 'allergy':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'medication':
        return <Pill className="w-5 h-5 text-blue-500" />;
      case 'condition':
        return <Heart className="w-5 h-5 text-red-500" />;
    }
  };

  const getFields = () => {
    switch (type) {
      case 'allergy':
        return [
          { key: 'name', label: 'Allergy Name', placeholder: 'e.g., Penicillin', required: true },
          { 
            key: 'severity', 
            label: 'Severity', 
            type: 'select', 
            options: ['mild', 'moderate', 'severe'],
            required: true 
          }
        ];
      case 'medication':
        return [
          { key: 'name', label: 'Medication Name', placeholder: 'e.g., Lisinopril', required: true },
          { key: 'dosage', label: 'Dosage', placeholder: 'e.g., 10mg daily', required: true },
          { key: 'frequency', label: 'Frequency', placeholder: 'e.g., Once daily', required: false }
        ];
      case 'condition':
        return [
          { key: 'name', label: 'Condition Name', placeholder: 'e.g., Hypertension', required: true },
          { 
            key: 'type', 
            label: 'Type', 
            type: 'select', 
            options: ['acute', 'chronic', 'hereditary'],
            required: true 
          }
        ];
      default:
        return [];
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const fields = getFields();
    
    fields.forEach(field => {
      if (field.required && !formData[field.key]?.trim()) {
        newErrors[field.key] = `${field.label} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAdd(formData);
      setFormData({});
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({});
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const fields = getFields();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    errors[field.key] ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    errors[field.key] ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder={field.placeholder}
                />
              )}
              
              {errors[field.key] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
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
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              Add {type === 'allergy' ? 'Allergy' : type === 'medication' ? 'Medication' : 'Condition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};