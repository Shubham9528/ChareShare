import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, MapPin, Clock, Search, Filter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useFavorites } from '../../../../hooks/useFavorites';
import { BottomNavigation } from '../../category/BottomNavigation';

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeNavTab, setActiveNavTab] = useState('profile');
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'distance'>('default');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    favoriteProviders, 
    loading, 
    removeFavorite 
  } = useFavorites();

  const handleBack = () => {
    navigate('/patient/profile/setting');
  };

  const handleToggleFavorite = async (providerId: string) => {
    try {
      await removeFavorite(providerId);
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      alert('Failed to remove from favorites. Please try again.');
    }
  };

  const handleProviderClick = (provider: any) => {
    // Navigate to provider details
    navigate(`/patient/providers/${provider.specialization.toLowerCase()}/selectedprofile`, {
      state: { provider }
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveNavTab(tab);
    
    // Navigate to different routes based on tab
    const basePath = user ? '/patient' : '/browse';
    
    switch (tab) {
      case 'home':
        if (user) {
          navigate('/patient/category');
        } else {
          navigate('/browse');
        }
        break;
      case 'search':
        navigate(`${basePath}/search`);
        break;
      case 'booking':
        if (user) {
          navigate('/patient/bookings');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'message':
        if (user) {
          navigate('/patient/messages');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'profile':
        if (user) {
          navigate('/patient/profile');
        } else {
          navigate('/login-selection');
        }
        break;
    }
  };

  // Determine current tab based on route
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/search')) {
      setActiveNavTab('search');
    } else if (path.includes('/booking')) {
      setActiveNavTab('booking');
    } else if (path.includes('/message')) {
      setActiveNavTab('message');
    } else if (path.includes('/profile')) {
      setActiveNavTab('profile');
    } else {
      setActiveNavTab('home');
    }
  }, [location.pathname]);

  // Filter providers based on search query
  const filteredProviders = favoriteProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-xl font-semibold text-gray-900">
            Favourite Provider
          </h1>
          
          {/* Empty div for spacing */}
          <div className="w-10"></div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Search and Filter */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search providers..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Sort/Filter Button */}
          <button 
            onClick={() => setSortBy(sortBy === 'default' ? 'rating' : sortBy === 'rating' ? 'distance' : 'default')}
            className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {sortedProviders.length} Provider{sortedProviders.length !== 1 ? 's' : ''}
          </h2>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{sortBy === 'default' ? 'Default' : sortBy === 'rating' ? 'Rating' : 'Distance'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Providers List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : sortedProviders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No providers found' : 'No favorite providers'}
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Try adjusting your search criteria' 
                  : 'Start adding providers to your favorites to see them here'
                }
              </p>
            </div>
          ) : (
            sortedProviders.map((provider) => (
              <div
                key={provider.id}
                onClick={() => handleProviderClick(provider)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                {/* Provider Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={provider.image}
                    alt={`${provider.name} - ${provider.specialization}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center text-white">
                            <div class="text-center">
                              <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                              </div>
                              <p class="font-semibold">${provider.name}</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">
                      {provider.rating} ({provider.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(provider.id);
                    }}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      provider.isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${provider.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Provider Info */}
                <div className="p-4 space-y-3">
                  {/* Name and Specialization */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {provider.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {provider.specialization}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    I'm a {provider.specialization.toLowerCase()} with experience, dedicated to providing compassionate and{' '}
                    <button className="text-blue-600 font-medium hover:underline">
                      Learn more
                    </button>
                  </p>

                  {/* Address */}
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {provider.address}
                    </span>
                  </div>

                  {/* Time and Availability */}
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {provider.estimatedTime}. {provider.distance}. {provider.availability} | {provider.hours}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeNavTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};