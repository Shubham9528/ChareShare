import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Trash2, RotateCcw, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CameraScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [fileName] = useState('HannahBusing_Resume.pdf');
  const [fileSize] = useState('200 KB');

  const handleBack = () => {
    navigate('/patient/profile/setting/uploaddoc');
  };

  const handleScanDocument = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanComplete(false);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleRetakeScan = () => {
    setScanProgress(0);
    setIsScanning(false);
    setScanComplete(false);
  };

  const handleConfirmScan = () => {
    // Navigate back to upload document page with success
    navigate('/patient/profile/setting/uploaddoc');
  };

  // Auto-start scanning when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScanDocument();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-900">
            Scan Document
          </h1>
          
          {/* Empty div for spacing */}
          <div className="w-10"></div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-8">
        {/* Scanning Status */}
        <div className="text-center">
          <p className="text-gray-600 leading-relaxed">
            Scanning your benefits... This may take a few seconds.
          </p>
        </div>

        {/* File Progress Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            {/* File Icon */}
            <div className="flex-shrink-0">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>

            {/* File Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{fileName}</p>
                <button className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">{fileSize}</p>
                {isScanning && (
                  <span className="text-sm text-blue-600">{Math.round(scanProgress)}%</span>
                )}
              </div>

              {/* Progress Bar */}
              {(isScanning || scanComplete) && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Camera Viewfinder */}
        <div className="relative">
          {/* Viewfinder Frame */}
          <div className="bg-gray-100 rounded-2xl p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
            {/* Corner Brackets */}
            <div className="absolute top-8 left-8">
              <div className="w-8 h-8 border-l-4 border-t-4 border-blue-500 rounded-tl-lg"></div>
            </div>
            <div className="absolute top-8 right-8">
              <div className="w-8 h-8 border-r-4 border-t-4 border-blue-500 rounded-tr-lg"></div>
            </div>
            <div className="absolute bottom-8 left-8">
              <div className="w-8 h-8 border-l-4 border-b-4 border-blue-500 rounded-bl-lg"></div>
            </div>
            <div className="absolute bottom-8 right-8">
              <div className="w-8 h-8 border-r-4 border-b-4 border-blue-500 rounded-br-lg"></div>
            </div>

            {/* Scanning Animation */}
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-blue-500 opacity-70 animate-pulse"></div>
              </div>
            )}

            {/* Document Preview */}
            <div className="w-48 h-64 bg-white border-2 border-gray-300 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Document Preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-6">
          {/* Retake Button */}
          <button
            onClick={handleRetakeScan}
            disabled={isScanning}
            className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <RotateCcw className="w-6 h-6 text-gray-600" />
          </button>

          {/* Confirm Button */}
          <button
            onClick={scanComplete ? handleConfirmScan : handleScanDocument}
            disabled={isScanning}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-blue-200"
            style={{
              background: scanComplete 
                ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
            }}
          >
            {scanComplete ? (
              <Check className="w-8 h-8" />
            ) : (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
          </button>
        </div>

        {/* Bottom Action Buttons */}
        <div className="space-y-4">
          {/* Scan Document Button */}
          <button
            onClick={handleScanDocument}
            disabled={isScanning}
            className="w-full py-4 px-6 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
            style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
              <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 12a1 1 0 100-2 1 1 0 000 2zM12 13a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM16 16a1 1 0 100-2 1 1 0 000 2zM16 20a1 1 0 100-2 1 1 0 000 2zM12 17a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" />
            </svg>
            <span>{isScanning ? 'Scanning...' : 'Scan Document'}</span>
          </button>

          {/* Retake Scan Button */}
          <button
            onClick={handleRetakeScan}
            className="w-full py-4 px-6 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-3"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake Scan</span>
          </button>
        </div>
      </div>
    </div>
  );
};