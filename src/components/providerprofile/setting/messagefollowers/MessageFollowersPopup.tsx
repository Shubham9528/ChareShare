import React, { useState } from 'react';
import { X } from 'lucide-react';

interface MessageFollowersPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessageFollowersPopup: React.FC<MessageFollowersPopupProps> = ({
  isOpen,
  onClose
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Close popup after showing success message
      setTimeout(() => {
        handleClose();
      }, 1500);
    }, 1000);
  };

  const handleClose = () => {
    setMessage('');
    setIsSending(false);
    setIsSent(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Message to Followers</h2>
          <button
            onClick={handleClose}
            disabled={isSending}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Message Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message to all followers..."
            rows={5}
            disabled={isSending || isSent}
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-600 placeholder-gray-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            disabled={isSending}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isSending || isSent}
            className="flex-1 py-3 px-4 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
            }}
          >
            {isSending && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            )}
            {isSent ? 'Sent!' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};