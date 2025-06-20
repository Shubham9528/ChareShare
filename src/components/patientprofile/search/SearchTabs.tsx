import React from 'react';
import { SearchTab } from './SearchPage';

interface SearchTabsProps {
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
}

const tabs: { id: SearchTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
  { id: 'articles', label: 'Articles' },
];

export const SearchTabs: React.FC<SearchTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="flex space-x-1 px-4 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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
  );
};