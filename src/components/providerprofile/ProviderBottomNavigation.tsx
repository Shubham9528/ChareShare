import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';

export const ProviderBottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/provider/home' },
    { id: 'search', label: 'Search', icon: Search, path: '/provider/search' },
    { id: 'booking', label: 'Booking', icon: Calendar, path: '/provider/booking' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/provider/message' },
    { id: 'profile', label: 'Profile', icon: User, path: '/provider' },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    navigate(item.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.id === 'profile' && location.pathname === '/provider') ||
            (item.id === 'home' && location.pathname === '/provider/home') ||
            (item.id === 'search' && location.pathname === '/provider/search') ||
            (item.id === 'messages' && location.pathname === '/provider/message');
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};