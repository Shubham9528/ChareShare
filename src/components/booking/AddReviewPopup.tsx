import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';

interface AddReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; comment: string }) => void;
  doctorData: {
    name: string;
    specialization: string;
    avatar: string;
  };
}

export const AddReviewPopup: React.FC<AddReviewPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  doctorData
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      onSubmit({ rating, comment });
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setComment('');
    setIsSubmitting(false);
    onClose();
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white rounded-t-3xl px-4 py-6 mx-2 mb-2 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Handle Bar */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Add Review
            </h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Doctor Profile */}
          <div className="flex flex-col items-center mb-6">
            {/* Doctor Image with Verification Badge */}
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-lg">
                <img
                  src={doctorData.avatar}
                  alt={doctorData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                          ${doctorData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      `;
                    }
                  }}
                />
              </div>
              
              {/* Verification Badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Doctor Info */}
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Dr. Full Name
            </h3>
            <p className="text-gray-600 text-center text-sm">
              {doctorData.specialization}
            </p>
          </div>

          {/* Question */}
          <div className="text-center mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              How was your experience with Dr. Robinson?
            </h4>

            {/* Rating Section */}
            <div className="mb-4">
              <p className="text-gray-600 mb-3 text-sm">Your overall rating</p>
              
              {/* Star Rating */}
              <div className="flex justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                    disabled={isSubmitting}
                    className="transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:cursor-not-allowed"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors duration-200 ${
                        star <= (hoveredRating || rating)
                          ? 'text-orange-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <h5 className="text-base font-semibold text-gray-900 mb-3">
              Add Detailed Review
            </h5>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter here"
              rows={4}
              disabled={isSubmitting}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="w-full py-3 px-6 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
            }}
          >
            {isSubmitting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </button>
        </div>
      </div>
    </>
  );
};