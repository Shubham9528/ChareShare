import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PackageHeader } from './PackageHeader';
import { DurationSelector } from './DurationSelector';
import { PackageOptions } from './PackageOptions';
import { DetailedProvider } from '../../../types/provider';
import { mockProviders } from '../../../data/mockProviders';

interface PackageSelectionPageProps {
  onBack?: () => void;
  onNext?: (selectedPackage: PackageOption, duration: number) => void;
  onNavigateToCategory?: () => void;
}

export interface PackageOption {
  id: string;
  type: 'messaging' | 'voice' | 'video' | 'in-person';
  title: string;
  description: string;
  price: number;
  icon: string;
}

export const PackageSelectionPage: React.FC<PackageSelectionPageProps> = ({ 
  onBack,
  onNext,
  onNavigateToCategory
}) => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get provider data based on category or use first provider as fallback
  const provider = mockProviders.find(p => 
    p.specialization.toLowerCase() === category?.toLowerCase()
  ) || mockProviders[0];

  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [selectedPackage, setSelectedPackage] = useState<string>('messaging');

  // Get appointment data from previous page or use defaults
  const appointmentData = location.state?.appointmentData || {
    date: '14',
    time: '06:30 - 07:00',
    concern: 'Lorem Isum dolor',
    address: '1'
  };

  const packageOptions: PackageOption[] = [
    {
      id: 'messaging',
      type: 'messaging',
      title: 'Messaging',
      description: 'Chat with Doctor',
      price: 20,
      icon: '💬'
    },
    {
      id: 'voice',
      type: 'voice',
      title: 'Voice Call',
      description: 'Chat with Doctor',
      price: 40,
      icon: '📞'
    },
    {
      id: 'video',
      type: 'video',
      title: 'Video Call',
      description: 'Chat with Doctor',
      price: 60,
      icon: '📹'
    },
    {
      id: 'in-person',
      type: 'in-person',
      title: 'In Person',
      description: 'Chat with Doctor',
      price: 100,
      icon: '👤'
    }
  ];

  const handleNext = () => {
    const selected = packageOptions.find(pkg => pkg.id === selectedPackage);
    if (selected) {
      // Navigate to confirm details page with all necessary data
      navigate(`/patient/providers/${category}/selectedprofile/selectappoinment/packages/bookappoinment`, {
        state: {
          provider,
          selectedPackage: selected,
          duration: selectedDuration,
          appointmentData
        }
      });
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Navigate back to appointment booking page
      navigate(`/patient/providers/${category}/selectedprofile/selectappoinment`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PackageHeader onBack={handleBack} />

      {/* Content */}
      <div className="px-4 py-6 space-y-8 pb-32">
        {/* Duration Selection */}
        <DurationSelector
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
        />

        {/* Package Options */}
        <PackageOptions
          packages={packageOptions}
          selectedPackage={selectedPackage}
          duration={selectedDuration}
          onPackageSelect={setSelectedPackage}
        />
      </div>

      {/* Next Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={handleNext}
          className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200"
          style={{
            background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};