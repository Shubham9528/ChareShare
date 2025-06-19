import React from 'react';

interface ConcernInputProps {
  concern: string;
  onConcernChange: (concern: string) => void;
}

export const ConcernInput: React.FC<ConcernInputProps> = ({
  concern,
  onConcernChange
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Please Describe your Concern Briefly
      </h3>
      
      <textarea
        value={concern}
        onChange={(e) => onConcernChange(e.target.value)}
        placeholder="Write..."
        rows={4}
        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
      />
    </div>
  );
};