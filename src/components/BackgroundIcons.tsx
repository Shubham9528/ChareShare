import React from 'react';
import { Heart, Stethoscope, UserPlus, Activity, Pill, Cross } from 'lucide-react';

export const BackgroundIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Heart className="absolute top-20 left-10 w-6 h-6 text-blue-200 opacity-40" />
      <Stethoscope className="absolute top-32 right-16 w-8 h-8 text-indigo-200 opacity-30" />
      <Activity className="absolute top-48 left-20 w-5 h-5 text-purple-200 opacity-50" />
      <Pill className="absolute bottom-32 right-12 w-6 h-6 text-blue-200 opacity-35" />
      <Cross className="absolute bottom-20 left-14 w-7 h-7 text-indigo-200 opacity-25" />
      <UserPlus className="absolute top-1/3 right-8 w-5 h-5 text-purple-200 opacity-40" />
    </div>
  );
};