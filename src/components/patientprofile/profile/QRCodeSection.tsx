import React from 'react';
import { Copy, Share, Download } from 'lucide-react';

interface QRCodeSectionProps {
  onAction: (action: 'copy' | 'share' | 'download') => void;
}

export const QRCodeSection: React.FC<QRCodeSectionProps> = ({ onAction }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* QR Code */}
      <div className="flex justify-center mb-6">
        <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center">
          {/* QR Code Pattern - Using CSS to create a simple QR-like pattern */}
          <div className="w-40 h-40 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* QR Code pattern using blue squares */}
              <rect x="0" y="0" width="20" height="20" fill="#3B82F6" />
              <rect x="20" y="0" width="20" height="20" fill="#3B82F6" />
              <rect x="40" y="0" width="20" height="20" fill="#3B82F6" />
              <rect x="60" y="0" width="20" height="20" fill="#3B82F6" />
              <rect x="80" y="0" width="20" height="20" fill="#3B82F6" />
              <rect x="100" y="0" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="0" width="20" height="20" fill="#3B82F6" />
              
              <rect x="0" y="20" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="20" width="20" height="20" fill="#3B82F6" />
              
              <rect x="0" y="40" width="20" height="20" fill="#3B82F6" />
              <rect x="40" y="40" width="20" height="20" fill="#3B82F6" />
              <rect x="60" y="40" width="20" height="20" fill="#3B82F6" />
              <rect x="80" y="40" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="40" width="20" height="20" fill="#3B82F6" />
              
              <rect x="0" y="60" width="20" height="20" fill="#3B82F6" />
              <rect x="40" y="60" width="20" height="20" fill="#3B82F6" />
              <rect x="80" y="60" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="60" width="20" height="20" fill="#3B82F6" />
              
              <rect x="0" y="80" width="20" height="20" fill="#3B82F6" />
              <rect x="40" y="80" width="20" height="20" fill="#3B82F6" />
              <rect x="60" y="80" width="20" height="20" fill="#3B82F6" />
              <rect x="80" y="80" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="80" width="20" height="20" fill="#3B82F6" />
              
              <rect x="0" y="100" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="100" width="20" height="20" fill="#3B82F6" />
              
              <rect x="0" y="120" width="20" height="20" fill="#3B82F6" />
              <rect x="20" y="120" width="20" height="20" fill="#3B82F6" />
              <rect x="40" y="120" width="20" height="20" fill="#3B82F6" />
              <rect x="60" y="120" width="20" height="20" fill="#3B82F6" />
              <rect x="80" y="120" width="20" height="20" fill="#3B82F6" />
              <rect x="100" y="120" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="120" width="20" height="20" fill="#3B82F6" />
              
              {/* Add more QR pattern elements */}
              <rect x="160" y="0" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="0" width="20" height="20" fill="#3B82F6" />
              <rect x="160" y="20" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="20" width="20" height="20" fill="#3B82F6" />
              <rect x="160" y="40" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="40" width="20" height="20" fill="#3B82F6" />
              <rect x="160" y="60" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="60" width="20" height="20" fill="#3B82F6" />
              <rect x="160" y="80" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="80" width="20" height="20" fill="#3B82F6" />
              <rect x="160" y="100" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="100" width="20" height="20" fill="#3B82F6" />
              <rect x="160" y="120" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="120" width="20" height="20" fill="#3B82F6" />
              
              {/* Bottom section */}
              <rect x="0" y="160" width="20" height="20" fill="#3B82F6" />
              <rect x="20" y="160" width="20" height="20" fill="#3B82F6" />
              <rect x="40" y="160" width="20" height="20" fill="#3B82F6" />
              <rect x="60" y="160" width="20" height="20" fill="#3B82F6" />
              <rect x="80" y="160" width="20" height="20" fill="#3B82F6" />
              <rect x="100" y="160" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="160" width="20" height="20" fill="#3B82F6" />
              <rect x="160" y="160" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="160" width="20" height="20" fill="#3B82F6" />
              
              <rect x="0" y="180" width="20" height="20" fill="#3B82F6" />
              <rect x="120" y="180" width="20" height="20" fill="#3B82F6" />
              <rect x="160" y="180" width="20" height="20" fill="#3B82F6" />
              <rect x="180" y="180" width="20" height="20" fill="#3B82F6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-8">
        <button
          onClick={() => onAction('copy')}
          className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Copy className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm text-gray-600 font-medium">Copy link</span>
        </button>

        <button
          onClick={() => onAction('share')}
          className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Share className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm text-gray-600 font-medium">Share</span>
        </button>

        <button
          onClick={() => onAction('download')}
          className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Download className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm text-gray-600 font-medium">Download</span>
        </button>
      </div>
    </div>
  );
};