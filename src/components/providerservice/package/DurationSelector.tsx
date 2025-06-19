import React from 'react';
import { Clock, ChevronDown } from 'lucide-react';

interface DurationSelectorProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const durationOptions = [15, 30, 45, 60];

export const DurationSelector: React.FC<DurationSelectorProps> = ({
  selectedDuration,
  onDurationChange
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Select Duration</h2>
      
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          {/* Clock Icon */}
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          
          {/* Duration Dropdown */}
          <div className="flex-1 relative">
            <select
              value={selectedDuration}
              onChange={(e) => onDurationChange(Number(e.target.value))}
              className="w-full appearance-none bg-transparent text-lg font-medium text-gray-900 focus:outline-none cursor-pointer pr-8"
            >
              {durationOptions.map((duration) => (
                <option key={duration} value={duration}>
                  {duration} minutes
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};