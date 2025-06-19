import React, { useState } from 'react';
import { ArrowLeft, Camera, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: profile?.full_name || 'John Worky',
    username: 'john.worky',
    experience: 'Add Exp...',
    specialist: 'Write...',
    gender: 'Male'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    navigate('/provider/setting');
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    
    // Simulate save operation
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/provider/setting');
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoChange = () => {
    // Implement photo change functionality
    console.log('Change profile photo');
  };

  return (
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
            Profile Edit
          </h1>
          
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`px-4 py-2 text-blue-600 font-semibold transition-colors duration-200 focus:outline-none focus:underline ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:underline'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-24">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              <img
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center text-white font-semibold text-xl">
                        JW
                      </div>
                    `;
                  }
                }}
              />
            </div>
            
            {/* Camera Button */}
            <button
              onClick={handlePhotoChange}
              className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Camera className="w-4 h-4" />
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
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder="Enter username"
            />
          </div>

          {/* Experience Field */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Experience</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-400 bg-white"
              placeholder="Add experience..."
            />
          </div>

          {/* Specialist Field */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Specialist</label>
            <input
              type="text"
              value={formData.specialist}
              onChange={(e) => handleInputChange('specialist', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-400 bg-white"
              placeholder="Write specialization..."
            />
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Gender</label>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
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
        </div>

        {/* Additional Information Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          
          <div className="space-y-4">
            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Phone Number</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder="Enter phone number"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                defaultValue={profile?.email || "hello@designpicko.com"}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder="Enter email address"
              />
            </div>

            {/* License Number */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">License Number</label>
              <input
                type="text"
                defaultValue="DDS-12345"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder="Enter license number"
              />
            </div>

            {/* Clinic Name */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Clinic Name</label>
              <input
                type="text"
                defaultValue="Wilson Dental Care"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder="Enter clinic name"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Bio</label>
              <textarea
                rows={4}
                defaultValue="Experienced dentist with 4+ years of practice, specializing in preventive and cosmetic dentistry. Committed to providing compassionate care and helping patients achieve optimal oral health."
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white resize-none"
                placeholder="Write a brief bio..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};