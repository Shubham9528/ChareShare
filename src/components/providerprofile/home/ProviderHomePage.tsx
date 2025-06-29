import React, { useEffect, useState } from 'react';
import { Search, Bell, Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { ProviderBottomNavigation } from '../ProviderBottomNavigation';
import { useProviderBookings } from '../../../hooks/useProviderBookings';
import { useProviderPosts, Post } from '../../../hooks/useProviderPosts';

export const ProviderHomePage: React.FC = () => {
  const { profile } = useAuth();
  const { bookings, loading: bookingsLoading } = useProviderBookings('upcoming');
  const { posts, loading: postsLoading } = useProviderPosts();
  const [upcomingPatients, setUpcomingPatients] = useState<any[]>([]);

  // Transform bookings to upcoming patients
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const patients = bookings.slice(0, 2).map(booking => ({
        id: booking.id,
        bookingNumber: `#${booking.id.substring(0, 5)}`,
        name: booking.patient.user_profile.full_name,
        avatar: booking.patient.user_profile.avatar_url || 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100',
        date: new Date(booking.appointment_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        time: booking.appointment_time.substring(0, 5)
      }));
      
      setUpcomingPatients(patients);
    } else {
      // Use mock data if no bookings
      setUpcomingPatients([
        {
          id: '1',
          bookingNumber: '#23567',
          name: 'Darlene Robertson',
          avatar: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100',
          date: 'May 22, 2025',
          time: '10:00'
        },
        {
          id: '2',
          bookingNumber: '#23568',
          name: 'Leslie Alexander',
          avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
          date: 'May 22, 2025',
          time: '11:30'
        }
      ]);
    }
  }, [bookings]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Profile Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img
              src={profile?.avatar_url || "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                      ${(profile?.full_name || 'Dr').split(' ').map(n => n[0]).join('')}
                    </div>
                  `;
                }
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Search className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative">
              <Bell className="w-6 h-6 text-gray-700" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Upcoming Patients Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Upcoming Patients
          </h2>
          
          <div className="space-y-3">
            {bookingsLoading ? (
              <div className="flex justify-center items-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : upcomingPatients.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <p className="text-gray-600">No upcoming patients scheduled</p>
              </div>
            ) : (
              upcomingPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    {/* Patient Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                                ${patient.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>

                    {/* Patient Info */}
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">
                        {patient.bookingNumber}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {patient.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {patient.date} - {patient.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          {postsLoading ? (
            <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <p className="text-gray-600">No posts yet. Create your first post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    {/* Author Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={profile?.avatar_url || "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100"}
                        alt={profile?.full_name || "Provider"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                                ${(profile?.full_name || 'Dr').split(' ').map(n => n[0]).join('')}
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>

                    {/* Author Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {profile?.full_name || "Dr. Provider"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* More Options */}
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-2">
                  <p className="text-gray-900 mb-2">{post.content}</p>
                  {post.categories.length > 0 && (
                    <p className="text-blue-600 font-medium mb-2">
                      {post.categories.map(cat => `#${cat.replace(/\s+/g, '')}`).join(' ')}
                    </p>
                  )}
                </div>

                {/* Post Image */}
                {post.image_url && (
                  <div className="relative">
                    <img
                      src={post.image_url}
                      alt="Post content"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                          parent.innerHTML = `
                            <div class="w-full h-64 flex items-center justify-center">
                              <div class="text-center text-gray-500">
                                <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                  </svg>
                                </div>
                                <p class="font-medium">Medical Image</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors duration-200">
                        <Heart className="w-6 h-6 fill-current" />
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <MessageCircle className="w-6 h-6" />
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <Share className="w-6 h-6" />
                      </button>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                      <Bookmark className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <p className="font-semibold text-gray-900 mb-2">
                    {post.likes.toLocaleString()} likes
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};