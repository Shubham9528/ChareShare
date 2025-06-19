import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useProviderProfile } from '../../../../hooks/useProviderProfile';
import { dbService } from '../../../../lib/supabase';

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const { providerProfile, loading, updateProviderProfile } = useProviderProfile();
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    experience: '',
    specialist: '',
    gender: 'Male',
    phone: '',
    email: '',
    license_number: '',
    clinic_name: '',
    clinic_address: '',
    bio: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load profile data
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || '',
        username: profile.email?.split('@')[0] || '',
        email: profile.email || '',
        phone: profile.phone || ''
      }));
    }
    
    if (providerProfile) {
      setFormData(prev => ({
        ...prev,
        experience: providerProfile.years_of_experience?.toString() || '',
        specialist: providerProfile.specialization || '',
        license_number: providerProfile.license_number || '',
        clinic_name: providerProfile.clinic_name || '',
        clinic_address: providerProfile.clinic_address || '',
        bio: providerProfile.bio || ''
      }));
    }
  }, [profile, providerProfile]);

  const handleBack = () => {
    navigate('/provider/setting');
  };

  const handleSave = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Update user profile
      await updateProfile({
        full_name: formData.name,
        phone: formData.phone
      });
      
      // Update provider profile
      await updateProviderProfile({
        specialization: formData.specialist,
        years_of_experience: parseInt(formData.experience) || 0,
        license_number: formData.license_number,
        clinic_name: formData.clinic_name,
        clinic_address: formData.clinic_address,
        bio: formData.bio
      });
      
      navigate('/provider/setting');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;
    
    const file = e.target.files[0];
    
    try {
      // Upload to storage
      const path = `avatars/${user.id}/${Date.now()}_${file.name}`;
      await dbService.uploadFile('profiles', path, file);
      
      // Get public URL
      const avatarUrl = dbService.getFileUrl('profiles', path);
      
      // Update profile
      await updateProfile({ avatar_url: avatarUrl });
      
      alert('Profile photo updated successfully!');
    } catch (error) {
      console.error('Failed to update profile photo:', error);
      alert('Failed to update profile photo. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                src={profile?.avatar_url || "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center text-white font-semibold text-xl">
                        ${formData.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    `;
                  }
                }}
              />
            </div>
            
            {/* Camera Button */}
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
              <Camera className="w-4 h-4" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {formData.name}
            </h2>
            <label className="text-blue-600 font-medium hover:underline focus:outline-none focus:underline cursor-pointer">
              Change profile photo
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoChange}
              />
            </label>
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
            <label className="text-gray-700 font-medium">Experience (years)</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
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
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
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
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
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
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder="Enter email address"
                disabled // Email should be changed through auth settings
              />
            </div>

            {/* License Number */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">License Number</label>
              <input
                type="text"
                value={formData.license_number}
                onChange={(e) => handleInputChange('license_number', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder="Enter license number"
              />
            </div>

            {/* Clinic Name */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Clinic Name</label>
              <input
                type="text"
                value={formData.clinic_name}
                onChange={(e) => handleInputChange('clinic_name', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder="Enter clinic name"
              />
            </div>

            {/* Clinic Address */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Clinic Address</label>
              <input
                type="text"
                value={formData.clinic_address}
                onChange={(e) => handleInputChange('clinic_address', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder="Enter clinic address"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Bio</label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
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