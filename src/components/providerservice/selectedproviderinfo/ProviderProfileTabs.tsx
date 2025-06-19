import React from 'react';
import { ProfileTab } from './ProviderProfilePage';

interface ProviderProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const tabs: { id: ProfileTab; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'posts', label: 'Posts' },
  { id: 'articles', label: 'Articles' },
];

export const ProviderProfileTabs: React.FC<ProviderProfileTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              index === 0 ? 'rounded-l-2xl' : ''
            } ${
              index === tabs.length - 1 ? 'rounded-r-2xl' : ''
            } ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};