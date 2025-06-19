import React from 'react';
import { PatientDetails } from './ConfirmDetailsPage';

interface PatientDetailsSectionProps {
  patientDetails: PatientDetails;
}

export const PatientDetailsSection: React.FC<PatientDetailsSectionProps> = ({
  patientDetails
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Patient Details
      </h3>
      
      <div className="space-y-4">
        {/* Full Name */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Full Name</span>
          <span className="font-medium text-gray-900">{patientDetails.fullName}</span>
        </div>

        {/* Gender */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Gender</span>
          <span className="font-medium text-gray-900">{patientDetails.gender}</span>
        </div>

        {/* Age */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Age</span>
          <span className="font-medium text-gray-900">{patientDetails.age}</span>
        </div>

        {/* Problem */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Problem</span>
          <span className="font-medium text-gray-900">{patientDetails.problem}</span>
        </div>
      </div>
    </div>
  );
};