import React from 'react';
import { Home, Search, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }> | 'custom-message' | 'custom-booking';
}

// Custom Message SVG Component
const CustomMessageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.76923 0.691406C1.24062 0.691406 0 1.93202 0 3.46064V14.5376C0 16.0662 1.24062 17.3068 2.76923 17.3068H21.2308C22.7594 17.3068 24 16.0662 24 14.5376V3.46064C24 1.93202 22.7594 0.691406 21.2308 0.691406H2.76923ZM2.76923 2.53756H21.2308C21.7394 2.53756 22.1538 2.95202 22.1538 3.46064V3.92218L12 9.40341L1.84615 3.92218V3.46064C1.84615 2.95202 2.26062 2.53756 2.76923 2.53756ZM1.84615 4.18156L7.87477 8.88371L1.96154 14.9419L9.17354 9.80679L12 11.6243L14.8274 9.80679L22.0385 14.9419L16.1252 8.88371L22.1538 4.18156V14.5376C22.1487 14.6797 22.1091 14.8184 22.0385 14.9419C21.8862 15.2419 21.5898 15.4606 21.2308 15.4606H2.76923C2.41015 15.4606 2.11385 15.2428 1.96154 14.9419C1.891 14.8187 1.85141 14.6794 1.84615 14.5376V4.18156Z" fill="currentColor"/>
  </svg>
);

// Custom Booking SVG Component
const CustomBookingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.5714 3.4269C2.11675 3.4269 1.68071 3.60751 1.35922 3.929C1.03773 4.25049 0.857117 4.68653 0.857117 5.14118V21.4269C0.857117 21.8816 1.03773 22.3176 1.35922 22.6391C1.68071 22.9606 2.11675 23.1412 2.5714 23.1412H21.4285C21.8832 23.1412 22.3192 22.9606 22.6407 22.6391C22.9622 22.3176 23.1428 21.8816 23.1428 21.4269V5.14118C23.1428 4.68653 22.9622 4.25049 22.6407 3.929C22.3192 3.60751 21.8832 3.4269 21.4285 3.4269H18M5.99997 0.855469V5.99833M18 0.855469V5.99833M5.99997 3.4269H14.5714" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.608 7.82031C10.3807 7.82031 10.1626 7.91062 10.0019 8.07136C9.84114 8.23211 9.75084 8.45013 9.75084 8.67746V11.0877H7.33712C7.1098 11.0877 6.89178 11.178 6.73103 11.3388C6.57029 11.4995 6.47998 11.7176 6.47998 11.9449V14.7306C6.47998 14.9579 6.57029 15.1759 6.73103 15.3367C6.89178 15.4974 7.1098 15.5877 7.33712 15.5877H9.74912V17.998C9.74912 18.2254 9.83943 18.4434 10.0002 18.6041C10.1609 18.7649 10.3789 18.8552 10.6063 18.8552H13.392C13.5045 18.8552 13.616 18.833 13.72 18.7899C13.824 18.7468 13.9185 18.6837 13.9981 18.6041C14.0777 18.5245 14.1408 18.43 14.1839 18.326C14.227 18.222 14.2491 18.1106 14.2491 17.998V15.5877H16.6594C16.8867 15.5877 17.1048 15.4974 17.2655 15.3367C17.4262 15.1759 17.5166 14.9579 17.5166 14.7306V11.9449C17.5166 11.7176 17.4262 11.4995 17.2655 11.3388C17.1048 11.178 16.8867 11.0877 16.6594 11.0877H14.2508V8.67746C14.2508 8.45013 14.1605 8.23211 13.9998 8.07136C13.839 7.91062 13.621 7.82031 13.3937 7.82031H10.608Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'booking', label: 'Booking', icon: 'custom-booking' },
  { id: 'message', label: 'Message', icon: 'custom-message' },
  { id: 'profile', label: 'Profile', icon: User },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.icon === 'custom-message' ? (
                <CustomMessageIcon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              ) : item.icon === 'custom-booking' ? (
                <CustomBookingIcon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              ) : (
                (() => {
                  const IconComponent = item.icon as React.ComponentType<{ className?: string }>;
                  return <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />;
                })()
              )}
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