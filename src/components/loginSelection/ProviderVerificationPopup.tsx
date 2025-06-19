import React, { useState } from 'react';
import { X, Shield, Loader2, Check } from 'lucide-react';

interface ProviderVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
}

export const ProviderVerificationPopup: React.FC<ProviderVerificationPopupProps> = ({
  isOpen,
  onClose,
  onVerify
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  if (!isOpen) return null;

  const handleVerify = async () => {
    if (!code.trim()) {
      setError('Please enter verification code');
      return;
    }

    if (code !== 'Admin@123') {
      setError('Invalid verification code');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      onVerify(); // This will mark the provider as verified
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (error) setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isVerified) {
      handleVerify();
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setCode('');
    setError('');
    setIsVerifying(false);
    setIsVerified(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isVerifying}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div 
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isVerified ? 'bg-green-500' : ''
            }`}
            style={!isVerified ? {
              background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
            } : {}}
          >
            {isVerified ? (
              <Check className="w-8 h-8 text-white" />
            ) : (
              <Shield className="w-8 h-8 text-white" />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          {isVerified ? 'Verification Successful!' : 'Provider Verification'}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
          {isVerified 
            ? 'You are now verified as a provider. Click "Get Started" to continue.'
            : 'Enter your verification code to access the provider portal'
          }
        </p>

        {!isVerified && (
          <>
            {/* Input Field */}
            <div className="mb-4">
              <input
                type="text"
                value={code}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter verification code"
                disabled={isVerifying}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center font-mono text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-center">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              style={{
                background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
              }}
            >
              {isVerifying && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isVerifying ? 'Verifying...' : 'Verify'}</span>
            </button>
          </>
        )}

        {isVerified && (
          <div className="text-center">
            <button
              onClick={handleClose}
              className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-200"
              style={{
                background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)'
              }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Contact admin if you don't have a verification code
          </p>
        </div>
      </div>
    </div>
  );
};