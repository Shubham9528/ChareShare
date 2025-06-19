import React from 'react';
import { ChevronDown } from 'lucide-react';
import { DateSlot, TimeSlot } from './AppointmentBookingPage';

interface DateTimeSelectionProps {
  dateSlots: DateSlot[];
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  dateSlots,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange
}) => {
  const selectedDateData = dateSlots.find(slot => slot.date === selectedDate);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Month Selector */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">May, 2025</h3>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {dateSlots.map((dateSlot) => (
          <button
            key={dateSlot.date}
            onClick={() => onDateChange(dateSlot.date)}
            className={`p-3 rounded-xl text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              selectedDate === dateSlot.date
                ? 'text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
            style={selectedDate === dateSlot.date ? {
              background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
            } : {}}
          >
            <div className="text-xl font-bold mb-1">{dateSlot.date}</div>
            <div className="text-xs font-medium">{dateSlot.day}</div>
          </button>
        ))}
      </div>

      {/* Time Slot Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="font-medium text-gray-900">Today</span>
          <span className="text-sm text-gray-500">(No Slot)</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="font-medium text-gray-900">Tomorrow</span>
          <span className="text-sm text-blue-600 font-medium">(20 Slot)</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="font-medium text-gray-900">16 May</span>
          <span className="text-sm text-gray-500"></span>
        </div>
      </div>

      {/* Available Time Slots */}
      {selectedDateData && selectedDateData.slots.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Available Times</h4>
          <div className="grid grid-cols-2 gap-3">
            {selectedDateData.slots.map((timeSlot) => (
              <button
                key={timeSlot.id}
                onClick={() => onTimeChange(timeSlot.time)}
                disabled={!timeSlot.available}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedTime === timeSlot.time
                    ? 'text-white shadow-md'
                    : timeSlot.available
                    ? 'text-gray-700 hover:bg-gray-50 border border-gray-200'
                    : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                }`}
                style={selectedTime === timeSlot.time ? {
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
                } : {}}
              >
                {timeSlot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No slots available message */}
      {selectedDateData && selectedDateData.slots.length === 0 && (
        <div className="mt-6 text-center py-8">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">No time slots available for this date</p>
        </div>
      )}
    </div>
  );
};