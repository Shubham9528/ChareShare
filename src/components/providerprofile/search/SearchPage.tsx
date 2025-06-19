import React, { useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProviderBottomNavigation } from '../ProviderBottomNavigation';

export type ProviderSearchTab = 'all' | 'photos' | 'videos' | 'articles';

interface ProviderSearchPageProps {
  onBack?: () => void;
}

// Mock photo data with health and medical themes
const photoData = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Stethoscope on medical chart'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Woman doing yoga pose'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Person running outdoors'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Fresh fruits and vegetables'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Healthy salad bowl'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Friends exercising together'
  },
  {
    id: '7',
    url: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Medical equipment'
  },
  {
    id: '8',
    url: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Healthy smoothie ingredients'
  },
  {
    id: '9',
    url: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Doctor consultation'
  },
  {
    id: '10',
    url: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Fresh vegetables'
  },
  {
    id: '11',
    url: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Medical team'
  },
  {
    id: '12',
    url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Healthy lifestyle'
  }
];

const tabs: { id: ProviderSearchTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
  { id: 'articles', label: 'Articles' },
];

export const ProviderSearchPage: React.FC<ProviderSearchPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ProviderSearchTab>('photos');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/provider');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    handleSearch('');
  };

  // Filter photos based on search query (simple implementation)
  const filteredPhotos = searchQuery 
    ? photoData.filter(photo => 
        photo.alt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : photoData;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Search Bar */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center px-4 py-4">
          {/* Back Button */}
          {/*  */}

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200 text-gray-900 placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </form>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 pb-24">
        {/* Search Tabs */}
        <div className="bg-white border-b border-gray-100">
          <div className="flex space-x-1 px-4 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTab === tab.id
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={activeTab === tab.id ? {
                  background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
                } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Content */}
        <div className="px-4 py-4">
          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 gap-1">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square bg-gray-200 rounded-sm overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
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
                </div>
              ))}
              
              {filteredPhotos.length === 0 && searchQuery && (
                <div className="col-span-2 text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try searching for something else
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
              <p className="text-gray-600">Video search results would appear here</p>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Article search results would appear here</p>
            </div>
          )}

          {activeTab === 'all' && (
            <div className="grid grid-cols-2 gap-1">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square bg-gray-200 rounded-sm overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Provider Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};