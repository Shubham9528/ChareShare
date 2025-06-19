import React from 'react';
import { PackageCard } from './PackageCard';
import { PackageOption } from './PackageSelectionPage';

interface PackageOptionsProps {
  packages: PackageOption[];
  selectedPackage: string;
  duration: number;
  onPackageSelect: (packageId: string) => void;
}

export const PackageOptions: React.FC<PackageOptionsProps> = ({
  packages,
  selectedPackage,
  duration,
  onPackageSelect
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Select Package</h2>
      
      <div className="space-y-4">
        {packages.map((packageOption) => (
          <PackageCard
            key={packageOption.id}
            package={packageOption}
            duration={duration}
            isSelected={selectedPackage === packageOption.id}
            onSelect={() => onPackageSelect(packageOption.id)}
          />
        ))}
      </div>
    </div>
  );
};