import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchHeaderProps {
  onBack?: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ 
  onBack, 
  onSearch, 
  searchQuery 
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center px-4 py-4">
        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200 text-gray-900 placeholder-gray-500"
            />
            {localQuery && (
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
  );
};