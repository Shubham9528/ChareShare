import React from 'react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-3">
      {/* Section Title */}
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide px-2">
        {title}
      </h2>
      
      {/* Section Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );
};