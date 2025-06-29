import React from 'react';
import { Search, Bell, Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { ProviderBottomNavigation } from '../ProviderBottomNavigation';

export const ProviderHomePage: React.FC = () => {
  const { profile } = useAuth();

  const upcomingPatients = [
    {
      id: '1',
      bookingNumber: '#23567',
      name: 'Darlene Robertson',
      avatar: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: 'May 22, 2023',
      time: '10:00 AM'
    },
    {
      id: '2',
      bookingNumber: '#23567',
      name: 'Leslie Alexander',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: 'May 22, 2023',
      time: '10:00 AM'
    }
  ];

  const posts = [
    {
      id: '1',
      author: {
        name: 'Dr. Sarah Johnson',
        title: 'Cardiologist',
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      content: 'Understanding heart health basics: 5 tips for a healthy heart 🖤',
      hashtags: '#HeartHealth #HealthTips',
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 2456,
      timestamp: '2 hours ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Profile Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100"
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
            {upcomingPatients.map((patient) => (
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
            ))}
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          {posts.map((post) => (
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
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center text-white font-semibold">
                              ${post.author.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>

                  {/* Author Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {post.author.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {post.author.title}
                    </p>
                  </div>
                </div>

                {/* More Options */}
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Post Image */}
              <div className="relative">
                <img
                  src={post.image}
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

                {/* Post Content */}
                <div className="space-y-2">
                  <p className="text-gray-900">
                    <span className="font-semibold">{post.author.name}</span>{' '}
                    {post.content}
                  </p>
                  <p className="text-blue-600 font-medium">
                    {post.hashtags}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation />
    </div>
  );
};