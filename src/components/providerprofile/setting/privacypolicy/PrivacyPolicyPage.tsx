import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/provider/setting');
  };

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
            Privacy Policy
          </h1>
          
          {/* Empty div for spacing */}
          <div className="w-10"></div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold text-gray-900">CareCircle</span>, Lorem Ipsum is simply 
            dummy text of the printing and typesetting industry. Lorem Ipsum has 
            been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Information We Collect Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry:
          </p>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting 
                industry. Lorem Ipsum has been the industry's standard dummy text ever 
                since the 1500s,
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting 
                industry. Lorem Ipsum has been the industry's standard dummy text ever 
                since the 1500s,
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting 
                industry. Lorem Ipsum has been the industry's standard dummy text ever 
                since the 1500s,
              </span>
            </li>
          </ul>
        </div>

        {/* How We Use Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            How We Use Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry:
          </p>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                To provide and maintain our healthcare services and platform functionality
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                To facilitate appointments and communication between patients and providers
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                To improve our services and develop new features based on user feedback
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                To send important notifications about your appointments and account
              </span>
            </li>
          </ul>
        </div>

        {/* Data Protection Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Data Protection
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement appropriate security measures to protect your personal information:
          </p>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                End-to-end encryption for all sensitive medical communications
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Secure servers with regular security audits and updates
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Limited access to personal data on a need-to-know basis
              </span>
            </li>
          </ul>
        </div>

        {/* Your Rights Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to:
          </p>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Access and review your personal information stored in our system
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Request corrections to any inaccurate or incomplete information
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Delete your account and associated data (subject to legal requirements)
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Opt-out of non-essential communications and marketing materials
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data practices, 
            please contact us:
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> privacy@carecircle.com
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> +1 (555) 123-4567
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Address:</span> 123 Healthcare Ave, Medical District, City, State 12345
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Last updated: January 15, 2024
          </p>
        </div>
      </div>
    </div>
  );
};