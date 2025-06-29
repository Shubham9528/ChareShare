import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProviderTab } from './ProviderProfilePage';
import { PhotoGrid } from './PhotoGrid';
import { Post } from '../../hooks/useProviderPosts';

interface ProviderProfileContentProps {
  activeTab: ProviderTab;
  onAddContent: () => void;
  posts?: Post[];
  loading?: boolean;
}

export const ProviderProfileContent: React.FC<ProviderProfileContentProps> = ({
  activeTab,
  onAddContent,
  posts = [],
  loading = false
}) => {
  const navigate = useNavigate();

  const handleAddContent = () => {
    navigate('/provider/addpost');
  };

  if (activeTab === 'posts') {
    return (
      <div className="relative">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 p-1">
            {posts.map(post => (
              <div 
                key={post.id}
                className="aspect-square bg-gray-200 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200 rounded-md"
              >
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <div class="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-2 text-center">
                    <p className="text-xs text-gray-600 line-clamp-3">{post.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <PhotoGrid />
        )}
        
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
      <div className="space-y-6 px-4">
        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Description</h3>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            "I'm a healthcare provider dedicated to providing compassionate and effective care. I specialize in preventive care and patient education, helping patients achieve their health goals."
          </p>
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Education</h3>
          </div>
          
          <p className="text-gray-600">
            Medical degree from accredited university
          </p>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
          
          {/* Map Placeholder */}
          <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              {/* Map with realistic appearance */}
              <div className="absolute inset-0">
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
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-3">
            <p className="text-gray-700">
              123 Medical Center, Downtown
            </p>
            <p className="text-gray-700">
              Mon-Fri | 9am - 5pm
            </p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">Rating</h3>
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
                Very competent specialist. I am very happy that there are such professional doctors. 
                My baby is in safe hands. My child's health is above all.
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
                Just a wonderful doctor, very happy that she is leading our child, competent, 
                very smart, nice.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'articles') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mx-4">
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