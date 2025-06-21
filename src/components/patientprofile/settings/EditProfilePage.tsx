import React from 'react';
import { ArrowLeft, Camera, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { usePatientSettings } from '../../../hooks/usePatientSettings';

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const {
    formData,
    isSubmitting,
    updateField,
    handleSubmit
  } = usePatientSettings({
    name: profile?.full_name || '',
    username: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: profile?.email || ''
  });

  const handleBack = () => {
    navigate('/patient/profile/setting');
  };

  const handleSave = () => {
    handleSubmit(() => {
      navigate('/patient/profile/setting');
    });
  };

  const handlePhotoChange = () => {
    // Implement photo change functionality
    console.log('Change profile photo');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-xl font-semibold text-gray-900">
            Edit Profile
          </h1>
          
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <button
              onClick={handlePhotoChange}
              className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {formData.name}
            </h2>
            <button
              onClick={handlePhotoChange}
              className="text-blue-600 font-medium hover:underline focus:outline-none focus:underline"
            >
              Change profile photo
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder="Enter your name"
            />
          </div>

          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => updateField('username', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder="Enter username"
            />
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Age</label>
            <input
              type="text"
              value={formData.age}
              onChange={(e) => updateField('age', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder="Enter your age"
            />
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Gender</label>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => updateField('gender', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white appearance-none cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder="Enter phone number"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder="Enter email address"
            />
          </div>
        </div>
      </div>
    </div>
  );
};