import React from 'react';
import { ProviderTab } from './ProviderProfilePage';

interface ProviderProfileTabsProps {
  activeTab: ProviderTab;
  onTabChange: (tab: ProviderTab) => void;
}

const tabs: { id: ProviderTab; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'posts', label: 'Posts' },
  { id: 'articles', label: 'Articles' },
];

export const ProviderProfileTabs: React.FC<ProviderProfileTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 focus:outline-none relative ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};