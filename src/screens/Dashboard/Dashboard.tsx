import React from 'react';
import { ArrowLeftIcon, Settings2Icon, PlusCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CareProvider {
  type: string;
  name: string;
  icon: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  
  const providers: CareProvider[] = [
    { type: 'Dentist', name: 'Dr. Sarah Smith', icon: '/frame-1.svg' },
    { type: 'Chiropractor', name: 'Dr. Robert Lee', icon: '/frame-2.svg' },
    { type: 'Physician', name: 'Dr. Lisa Johnson', icon: '/frame-3.svg' },
    { type: 'Physiotherapist', name: 'John Martinez', icon: '/frame-2.svg' },
    { type: 'Massage Therapist', name: 'Emma Wilson', icon: '/frame-4.svg' },
    { type: 'Podiatrist', name: 'Dr. Michael Chang', icon: '/frame-3.svg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 py-4 flex justify-between items-center border-b bg-white">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl font-semibold">Your Care Circle</h1>
        </div>
        <Settings2Icon className="w-6 h-6 text-gray-600" />
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="relative">
          {/* Center You circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-semibold">You</span>
            </div>
          </div>

          {/* Care Providers Circle */}
          <div className="w-[600px] h-[600px] relative">
            {providers.map((provider, index) => {
              const angle = (index * 360) / providers.length;
              const radius = 250; // Distance from center
              const left = 300 + radius * Math.cos((angle - 90) * (Math.PI / 180));
              const top = 300 + radius * Math.sin((angle - 90) * (Math.PI / 180));

              return (
                <div
                  key={provider.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}px`, top: `${top}px` }}
                >
                  <div className="bg-white rounded-lg shadow-md p-4 w-40">
                    <img src={provider.icon} alt={provider.type} className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{provider.type}</p>
                      <p className="text-sm text-gray-500">{provider.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button className="w-full bg-blue-500 text-white rounded-full py-3 px-4 flex items-center justify-center gap-2">
          <PlusCircleIcon className="w-5 h-5" />
          Share Your Care Circle
        </button>
      </div>
    </div>
  );
};