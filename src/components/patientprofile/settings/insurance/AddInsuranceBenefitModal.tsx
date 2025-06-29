import React, { useState } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';

interface AddInsuranceBenefitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (benefitData: {
    benefitType: string;
    providerName: string;
    policyNumber: string;
    totalAmount: string;
    usedAmount: string;
    renewalDate: string;
  }) => void;
}

export const AddInsuranceBenefitModal: React.FC<AddInsuranceBenefitModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    benefitType: '',
    providerName: '',
    policyNumber: '',
    totalAmount: '',
    usedAmount: '',
    renewalDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const benefitTypes = [
    'Dentistry',
    'Physiotherapy',
    'Massage Therapy',
    'Chiropractic',
    'Vision Care',
    'Prescription Drugs',
    'Mental Health',
    'Other'
  ];

  const insuranceProviders = [
    'Blue Cross',
    'Manulife',
    'Sun Life',
    'Great-West Life',
    'Canada Life',
    'Green Shield',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.benefitType) {
      newErrors.benefitType = 'Benefit type is required';
    }
    
    if (!formData.providerName) {
      newErrors.providerName = 'Insurance provider is required';
    }
    
    if (!formData.totalAmount) {
      newErrors.totalAmount = 'Total amount is required';
    } else if (isNaN(Number(formData.totalAmount)) || Number(formData.totalAmount) <= 0) {
      newErrors.totalAmount = 'Total amount must be a positive number';
    }
    
    if (!formData.usedAmount) {
      newErrors.usedAmount = 'Used amount is required';
    } else if (isNaN(Number(formData.usedAmount)) || Number(formData.usedAmount) < 0) {
      newErrors.usedAmount = 'Used amount must be a non-negative number';
    } else if (Number(formData.usedAmount) > Number(formData.totalAmount)) {
      newErrors.usedAmount = 'Used amount cannot exceed total amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSaving) return;
    
    setIsSaving(true);
    
    try {
      await onSave(formData);
      
      // Reset form
      setFormData({
        benefitType: '',
        providerName: '',
        policyNumber: '',
        totalAmount: '',
        usedAmount: '',
        renewalDate: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving benefit:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Insurance Benefit</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Benefit Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefit Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.benefitType}
                onChange={(e) => handleInputChange('benefitType', e.target.value)}
                className={`w-full p-3 border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 pr-10 ${
                  errors.benefitType ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <option value="">Select benefit type</option>
                {benefitTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.benefitType && <p className="text-red-500 text-sm mt-1">{errors.benefitType}</p>}
          </div>

          {/* Insurance Provider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.providerName}
                onChange={(e) => handleInputChange('providerName', e.target.value)}
                className={`w-full p-3 border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 pr-10 ${
                  errors.providerName ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <option value="">Select insurance provider</option>
                {insuranceProviders.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.providerName && <p className="text-red-500 text-sm mt-1">{errors.providerName}</p>}
          </div>

          {/* Policy Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number
            </label>
            <input
              type="text"
              value={formData.policyNumber}
              onChange={(e) => handleInputChange('policyNumber', e.target.value)}
              placeholder="Enter policy number"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Total Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`w-full p-3 pl-8 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.totalAmount ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.totalAmount && <p className="text-red-500 text-sm mt-1">{errors.totalAmount}</p>}
          </div>

          {/* Used Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Used Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={formData.usedAmount}
                onChange={(e) => handleInputChange('usedAmount', e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`w-full p-3 pl-8 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.usedAmount ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.usedAmount && <p className="text-red-500 text-sm mt-1">{errors.usedAmount}</p>}
          </div>

          {/* Renewal Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Renewal Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={formData.renewalDate}
                onChange={(e) => handleInputChange('renewalDate', e.target.value)}
                className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 px-4 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
              style={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Add Benefit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};