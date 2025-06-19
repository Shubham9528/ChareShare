import React, { useState } from 'react';
import { X, CreditCard, DollarSign } from 'lucide-react';

interface PaymentMethodPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: 'cash' | 'card') => void;
  currentPaymentMethod: 'cash' | 'card';
}

export const PaymentMethodPopup: React.FC<PaymentMethodPopupProps> = ({
  isOpen,
  onClose,
  onSelectPaymentMethod,
  currentPaymentMethod
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'cash' | 'card'>(currentPaymentMethod);

  const handleConfirm = () => {
    onSelectPaymentMethod(selectedMethod);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900">
              Payment Method
            </h2>
            
            {/* Empty div for spacing */}
            <div className="w-10"></div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Payment Option
            </h3>

            <div className="space-y-4">
              {/* Credit/Debit Card Option - Coming Soon */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl opacity-50 cursor-not-allowed">
                <div className="flex items-center space-x-4">
                  {/* Card Icon */}
                  <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-3 h-2 bg-red-600 rounded-full"></div>
                      <div className="w-3 h-2 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-lg font-medium text-gray-900">
                      Credit/Debit Card
                    </span>
                    <div className="text-sm text-gray-500">Coming Soon</div>
                  </div>
                </div>
                
                <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
              </div>

              {/* Cash Option */}
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  {/* Cash Icon */}
                  <div className="w-12 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  
                  <span className="text-lg font-medium text-gray-900">
                    Cash
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={selectedMethod === 'cash'}
                    onChange={(e) => setSelectedMethod(e.target.value as 'cash')}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    selectedMethod === 'cash' 
                      ? 'border-blue-600 bg-blue-600' 
                      : 'border-gray-300'
                  }`}>
                    {selectedMethod === 'cash' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </label>

              {/* PayPal Option - Coming Soon */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl opacity-50 cursor-not-allowed">
                <div className="flex items-center space-x-4">
                  {/* PayPal Icon */}
                  <div className="w-12 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PP</span>
                  </div>
                  
                  <div>
                    <span className="text-lg font-medium text-gray-900">
                      PayPal
                    </span>
                    <div className="text-sm text-gray-500">Coming Soon</div>
                  </div>
                </div>
                
                <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
              </div>

              {/* Google Pay Option - Coming Soon */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl opacity-50 cursor-not-allowed">
                <div className="flex items-center space-x-4">
                  {/* Google Pay Icon */}
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  
                  <div>
                    <span className="text-lg font-medium text-gray-900">
                      Google Pay
                    </span>
                    <div className="text-sm text-gray-500">Coming Soon</div>
                  </div>
                </div>
                
                <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <button
              onClick={handleConfirm}
              className="w-full text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200"
              style={{
                background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};