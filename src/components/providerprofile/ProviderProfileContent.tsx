import React, { useState } from 'react';
import { Plus, MapPin, Clock, Edit, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProviderTab } from './ProviderProfilePage';
import { PhotoGrid } from './PhotoGrid';

interface ProviderProfileContentProps {
  activeTab: ProviderTab;
  onAddContent: () => void;
}

export const ProviderProfileContent: React.FC<ProviderProfileContentProps> = ({
  activeTab,
  onAddContent
}) => {
  const navigate = useNavigate();
  
  // State for inline editing
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    description: "I'm a dentist with 4 years of experience, dedicated to providing compassionate and effective dental care. I specialize in preventive, restorative, and cosmetic treatments, helping patients achieve healthy and confident smiles.",
    education: "Doctor of Dental Surgery (DDS) - in the USA",
    address: "8398 Preston Rd, Inglewood, Maine 98262",
    hours: "Mon-Sun | 11am - 11pm"
  });

  const handleAddContent = () => {
    navigate('/provider/addpost');
  };

  const handleEditSection = (section: string) => {
    setEditingSection(section);
  };

  const handleSaveSection = (section: string) => {
    // Save the changes (in a real app, this would update the database)
    console.log(`Saving ${section}:`, editData[section as keyof typeof editData]);
    setEditingSection(null);
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    // Reset to original values if needed
  };

  const handleInputChange = (section: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  if (activeTab === 'posts') {
    return (
      <div className="relative">
        <PhotoGrid />
        
        {/* Floating Add Button */}
        <button
          onClick={handleAddContent}
          className="fixed bottom-24 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200 z-40"
          style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
          }}
        >
          <Plus className="w-6 h-6 mx-auto" />
        </button>
      </div>
    );
  }

  if (activeTab === 'details') {
    return (
      <div className="space-y-6">
        {/* Description Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Description</h3>
            {editingSection === 'description' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSection('description')}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEditSection('description')}
                className="text-blue-600 font-semibold hover:underline focus:outline-none focus:underline"
              >
                Edit
              </button>
            )}
          </div>
          
          {editingSection === 'description' ? (
            <textarea
              value={editData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-600 resize-none"
              rows={4}
              autoFocus
            />
          ) : (
            <p className="text-gray-600 leading-relaxed">
              "{editData.description}"
            </p>
          )}
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Education</h3>
            {editingSection === 'education' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSection('education')}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEditSection('education')}
                className="text-blue-600 font-semibold hover:underline focus:outline-none focus:underline"
              >
                Edit
              </button>
            )}
          </div>
          
          {editingSection === 'education' ? (
            <input
              type="text"
              value={editData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-600"
              autoFocus
            />
          ) : (
            <p className="text-gray-600">
              {editData.education}
            </p>
          )}
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Location</h3>
            {editingSection === 'location' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSection('location')}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEditSection('location')}
                className="text-blue-600 font-semibold hover:underline focus:outline-none focus:underline"
              >
                Edit
              </button>
            )}
          </div>
          
          {/* Interactive Map */}
          <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
            {/* Map with realistic appearance */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
              {/* Map grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10B981" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              {/* Roads */}
              <div className="absolute top-8 left-4 w-32 h-1 bg-gray-300 rounded transform rotate-12"></div>
              <div className="absolute top-16 left-8 w-24 h-1 bg-gray-300 rounded transform -rotate-45"></div>
              <div className="absolute bottom-12 right-8 w-28 h-1 bg-gray-300 rounded transform rotate-45"></div>
              <div className="absolute bottom-8 left-12 w-20 h-1 bg-gray-300 rounded"></div>
              
              {/* Buildings/Areas */}
              <div className="absolute top-4 right-4 w-8 h-6 bg-blue-200 rounded opacity-60"></div>
              <div className="absolute top-12 right-12 w-6 h-8 bg-green-200 rounded opacity-60"></div>
              <div className="absolute bottom-16 left-4 w-10 h-6 bg-yellow-200 rounded opacity-60"></div>
              
              {/* Location Pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                </div>
              </div>
              
              {/* Additional map markers */}
              <div className="absolute top-6 left-8 w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="absolute top-20 right-20 w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              {editingSection === 'location' ? (
                <input
                  type="text"
                  value={editData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  autoFocus
                />
              ) : (
                <span className="text-gray-700 font-medium">{editData.address}</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-3 h-3 text-white" />
              </div>
              {editingSection === 'location' ? (
                <input
                  type="text"
                  value={editData.hours}
                  onChange={(e) => handleInputChange('hours', e.target.value)}
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                />
              ) : (
                <span className="text-gray-700 font-medium">{editData.hours}</span>
              )}
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-gray-900">Rating</h3>
              <div className="flex items-center space-x-1">
                <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-gray-900">4.9 out of 5</span>
              </div>
            </div>
            <button className="text-blue-600 font-medium hover:underline">
              See all →
            </button>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            {/* Anonymous Review */}
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Anonymous feedback</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Very competent specialist. I am very happy that there are such professional dentists. 
                My dental health is in safe hands. Excellent care and attention to detail.
              </p>
            </div>

            {/* Named Review */}
            <div className="border-l-4 border-green-600 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">EL</span>
                </div>
                <span className="font-medium text-gray-900">Erika Lhee</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Just a wonderful dentist, very happy with the treatment, competent, 
                very professional, and friendly. Highly recommend!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'articles') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
          <p className="text-gray-600">Articles will appear here</p>
        </div>
      </div>
    );
  }

  return null;
};