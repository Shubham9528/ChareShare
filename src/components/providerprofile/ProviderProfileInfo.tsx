import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Share, Download, X, Check } from 'lucide-react';
import { DetailedProvider } from '../../types/provider';

interface ProviderProfileInfoProps {
  provider: DetailedProvider;
  isFollowing: boolean;
  onFollow: () => void;
  onMessage: () => void;
}

export const ProviderProfileInfo: React.FC<ProviderProfileInfoProps> = ({
  provider,
  isFollowing,
  onFollow,
  onMessage
}) => {
  const navigate = useNavigate();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = () => {
    setShowSharePopup(true);
  };

  const handleClosePopup = () => {
    setShowSharePopup(false);
    setCopySuccess(false);
  };

  const handleCopyLink = async () => {
    try {
      const profileUrl = `${window.location.origin}/provider/${provider.id}`;
      await navigator.clipboard.writeText(profileUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShareToSocial = (platform: string) => {
    const profileUrl = `${window.location.origin}/provider/${provider.id}`;
    const shareText = `Check out ${provider.name} - ${provider.specialization} on CareCircle`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`Check out ${provider.name}`)}&body=${encodeURIComponent(`${shareText}\n\n${profileUrl}`)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const handleDownloadQR = () => {
    // Generate QR code and download
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;
    
    if (ctx) {
      // Create a simple QR-like pattern (in a real app, you'd use a QR library)
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(0, 0, 300, 300);
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${provider.name}`, 150, 150);
      ctx.fillText('CareCircle Profile', 150, 170);
    }
    
    const link = document.createElement('a');
    link.download = `${provider.name.replace(/\s+/g, '-')}-profile-qr.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleEdit = () => {
    navigate('/provider/setting');
  };

  return (
    <>
      <div className="px-4 py-6 space-y-6">
        {/* Profile Picture and Basic Info */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
            <img
              src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt={provider.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load, using fallback');
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-white font-semibold text-xl">
                      ${provider.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  `;
                }
              }}
            />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {provider.name}
            </h2>
            <p className="text-gray-600 mb-1">
              {provider.specialization}
            </p>
            <p className="text-gray-500 text-sm">
              +{provider.yearsOfExperience} Year Experience
            </p>
          </div>
        </div>

        {/* Stats - Fixed visibility with proper styling */}
        <div className="flex justify-around py-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">275</div>
            <div className="text-gray-600 text-sm font-medium">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">234</div>
            <div className="text-gray-600 text-sm font-medium">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">4.9</div>
            <div className="text-gray-600 text-sm font-medium">Reviews</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleEdit}
            className="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white hover:opacity-90 focus:ring-blue-500"
            style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
            }}
          >
            Edit
          </button>
          
          <button
            onClick={handleShare}
            className="flex-1 py-3 px-6 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Share
          </button>
        </div>
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-3xl max-w-md w-full mx-auto overflow-hidden">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <button 
                onClick={handleClosePopup}
                className="p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* QR Code */}
            <div className="flex justify-center pt-12 pb-8">
              <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
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
                    
                    {/* Additional QR pattern elements */}
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
            <div className="flex justify-center space-x-8 px-6 pb-12">
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors duration-200 text-white"
              >
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  {copySuccess ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Copy className="w-6 h-6" />
                  )}
                </div>
                <span className="text-sm font-medium">{copySuccess ? 'Copied!' : 'Copy link'}</span>
              </button>

              <button
                onClick={() => setShowSharePopup(true)}
                className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors duration-200 text-white"
              >
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Share className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Share</span>
              </button>

              <button
                onClick={handleDownloadQR}
                className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors duration-200 text-white"
              >
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Download</span>
              </button>
            </div>

            {/* Social Share Options */}
            <div className="bg-white p-6 rounded-t-3xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share via</h3>
              
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={() => handleShareToSocial('whatsapp')}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">W</span>
                  </div>
                  <span className="text-xs text-gray-600">WhatsApp</span>
                </button>
                
                <button
                  onClick={() => handleShareToSocial('twitter')}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">X</span>
                  </div>
                  <span className="text-xs text-gray-600">Twitter</span>
                </button>
                
                <button
                  onClick={() => handleShareToSocial('facebook')}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">f</span>
                  </div>
                  <span className="text-xs text-gray-600">Facebook</span>
                </button>
                
                <button
                  onClick={() => handleShareToSocial('email')}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">@</span>
                  </div>
                  <span className="text-xs text-gray-600">Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};