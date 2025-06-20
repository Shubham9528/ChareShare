import React from 'react';
import { MapPin, Clock, Star, User } from 'lucide-react';
import { DetailedProvider } from '../../../types/provider';
import { ProfileTab } from './ProviderProfilePage';

interface ProviderProfileContentProps {
  provider: DetailedProvider;
  activeTab: ProfileTab;
}

export const ProviderProfileContent: React.FC<ProviderProfileContentProps> = ({
  provider,
  activeTab
}) => {
  if (activeTab === 'details') {
    return (
      <div className="space-y-6">
        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            "I'm a dentist with {provider.yearsOfExperience} years of experience, dedicated to 
            providing compassionate and effective dental care. I specialize in preventive, 
            restorative, and cosmetic treatments, helping patients achieve healthy and 
            confident smiles."
          </p>
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
          <p className="text-gray-600">
            Doctor of Dental Surgery (DDS) - in the USA
          </p>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
          
          {/* Map Placeholder */}
          <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
              {/* Mock map elements */}
              <div className="absolute top-4 left-4 w-16 h-2 bg-green-200 rounded"></div>
              <div className="absolute top-8 left-4 w-12 h-2 bg-green-200 rounded"></div>
              <div className="absolute bottom-4 right-4 w-20 h-2 bg-blue-200 rounded"></div>
              <div className="absolute bottom-8 right-4 w-16 h-2 bg-blue-200 rounded"></div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-3 mb-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{provider.address}</span>
          </div>

          {/* Hours */}
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span className="text-gray-700">{provider.availability} | {provider.hours}</span>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">Rating</h3>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-900">{provider.rating} out of 5</span>
              </div>
            </div>
            <button className="text-blue-600 font-medium hover:underline">
              See all →
            </button>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            {/* Anonymous Review */}
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-medium text-gray-900">Anonymous feedback</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Very competent specialist. I am very happy that there are such professional doctors. 
                My baby is in safe hands. My child's health is above all.
              </p>
            </div>

            {/* Named Review */}
            <div className="border-l-4 border-green-600 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">EL</span>
                </div>
                <span className="font-medium text-gray-900">Erika Lhee</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Just a wonderful doctor, very happy that she is leading our child, competent, 
                very smart, nice.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'posts') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600">Posts from {provider.name} will appear here</p>
        </div>
      </div>
    );
  }

  if (activeTab === 'articles') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
          <p className="text-gray-600">Articles by {provider.name} will appear here</p>
        </div>
      </div>
    );
  }

  return null;
};