import React, { useState } from 'react';
import { PackageOption } from '../package/PackageSelectionPage';
import { PaymentMethodPopup } from './PaymentMethodPopup';

interface AmountAppointmentSectionProps {
  selectedPackage: PackageOption;
  duration: number;
  paymentMethod: 'cash' | 'card';
  onPaymentMethodChange: (method: 'cash' | 'card') => void;
}

export const AmountAppointmentSection: React.FC<AmountAppointmentSectionProps> = ({
  selectedPackage,
  duration,
  paymentMethod,
  onPaymentMethodChange
}) => {
  const [showPaymentMethodPopup, setShowPaymentMethodPopup] = useState(false);

  const handleChangePayment = () => {
    setShowPaymentMethodPopup(true);
  };

  const handleSelectPaymentMethod = (method: 'cash' | 'card') => {
    onPaymentMethodChange(method);
    setShowPaymentMethodPopup(false);
  };

  const handleClosePopup = () => {
    setShowPaymentMethodPopup(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Amount Appointment
        </h3>
        
        <div className="space-y-4">
          {/* Duration with Price */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Duration ({duration}mins)</span>
            <span className="font-medium text-gray-900">1*${selectedPackage.price}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium text-gray-900">{duration} minutes</span>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Amount</span>
            <span className="font-medium text-gray-900">${selectedPackage.price}</span>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-semibold">Total</span>
            <span className="font-bold text-gray-900 text-lg">${selectedPackage.price}</span>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-gray-600 capitalize">{paymentMethod}</span>
            <button
              onClick={handleChangePayment}
              className="text-blue-600 font-medium hover:underline focus:outline-none focus:underline"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Payment Method Popup */}
      <PaymentMethodPopup
        isOpen={showPaymentMethodPopup}
        onClose={handleClosePopup}
        onSelectPaymentMethod={handleSelectPaymentMethod}
        currentPaymentMethod={paymentMethod}
      />
    </>
  );
};