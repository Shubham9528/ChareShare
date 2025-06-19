import React from 'react';
import { BookingStatus } from './ProviderBookingsPage';

interface BookingTabsProps {
  activeTab: BookingStatus;
  onTabChange: (tab: BookingStatus) => void;
}

const tabs: { id: BookingStatus; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

export const BookingTabs: React.FC<BookingTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            activeTab === tab.id
              ? 'text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={activeTab === tab.id ? {
            background: '#FFFFFF'
          } : {}}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};