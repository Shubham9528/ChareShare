import React, { useState } from 'react';
import { ArrowLeft, Shield, Clock, Calendar, ChevronRight, Bell, User, Activity } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { BottomNavigation } from '../../category/BottomNavigation';

interface BenefitItem {
  id: string;
  category: string;
  icon: React.ReactNode;
  totalAmount: number;
  usedAmount: number;
  remainingPercentage: number;
  color: string;
}

interface SmartReminder {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  actionColor: string;
}

export const InsuranceBenefitsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeNavTab, setActiveNavTab] = useState('profile');

  const handleBack = () => {
    navigate('/patient/profile/setting');
  };

  // Mock insurance benefits data
  const overallBenefits = {
    total: 5000,
    used: 2500,
    usedPercentage: 50
  };

  const benefitItems: BenefitItem[] = [
    {
      id: '1',
      category: 'Dentistry',
      icon: <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2L3 7v11h14V7l-7-5z"/>
        </svg>
      </div>,
      totalAmount: 1000,
      usedAmount: 300,
      remainingPercentage: 70,
      color: 'blue'
    },
    {
      id: '2',
      category: 'Physiotherapy',
      icon: <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
        <Activity className="w-4 h-4 text-white" />
      </div>,
      totalAmount: 100,
      usedAmount: 30,
      remainingPercentage: 70,
      color: 'green'
    },
    {
      id: '3',
      category: 'Massage Therapy',
      icon: <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>,
      totalAmount: 1000,
      usedAmount: 300,
      remainingPercentage: 70,
      color: 'purple'
    },
    {
      id: '4',
      category: 'Chiropractic',
      icon: <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>,
      totalAmount: 100,
      usedAmount: 30,
      remainingPercentage: 70,
      color: 'orange'
    }
  ];

  const smartReminders: SmartReminder[] = [
    {
      id: '1',
      icon: <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <Calendar className="w-5 h-5 text-blue-600" />
      </div>,
      title: "You haven't used your dental benefits this year.",
      description: "Schedule a check-up to maintain your oral health.",
      actionText: "Schedule Now",
      actionColor: "blue"
    },
    {
      id: '2',
      icon: <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <Shield className="w-5 h-5 text-green-600" />
      </div>,
      title: "You haven't used your dental benefits this year.",
      description: "Schedule a check-up to maintain your oral health.",
      actionText: "Find Provider",
      actionColor: "green"
    }
  ];

  const handleTabChange = (tab: string) => {
    setActiveNavTab(tab);
    
    // Navigate to different routes based on tab
    const basePath = user ? '/patient' : '/browse';
    
    switch (tab) {
      case 'home':
        if (user) {
          navigate('/patient/category');
        } else {
          navigate('/browse');
        }
        break;
      case 'search':
        navigate(`${basePath}/search`);
        break;
      case 'booking':
        if (user) {
          navigate('/patient/bookings');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'message':
        if (user) {
          navigate('/patient/messages');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'profile':
        if (user) {
          navigate('/patient/profile');
        } else {
          navigate('/login-selection');
        }
        break;
    }
  };

  // Determine current tab based on route
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/search')) {
      setActiveNavTab('search');
    } else if (path.includes('/booking')) {
      setActiveNavTab('booking');
    } else if (path.includes('/message')) {
      setActiveNavTab('message');
    } else if (path.includes('/profile')) {
      setActiveNavTab('profile');
    } else {
      setActiveNavTab('home');
    }
  }, [location.pathname]);

  const handleScheduleNow = () => {
    // Navigate to booking or provider search
    navigate('/patient/search');
  };

  const handleFindProvider = () => {
    // Navigate to provider search
    navigate('/patient/search');
  };

  const handleSetReminders = () => {
    // Implement reminder settings
    console.log('Set benefit reminders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-xl font-semibold text-gray-900">
            Insurance Benefits
          </h1>
          
          {/* Empty div for spacing */}
          <div className="w-10"></div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Overall Benefits Card */}
        <div 
          className="rounded-2xl p-6 text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-4">Overall Benefits Used</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Total</span>
                <span className="text-xl font-bold">${overallBenefits.total.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Used</span>
                <span className="text-xl font-bold">${overallBenefits.used.toLocaleString()}</span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                    <div
                      className="bg-white h-3 rounded-full transition-all duration-500"
                      style={{ width: `${overallBenefits.usedPercentage}%` }}
                    />
                  </div>
                  <span className="ml-3 text-white font-semibold">{overallBenefits.usedPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Used Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Benefits Used</h3>
          
          <div className="space-y-3">
            {benefitItems.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  {/* Left Side - Icon and Info */}
                  <div className="flex items-center space-x-4">
                    {benefit.icon}
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {benefit.category}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.remainingPercentage}% remaining
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Amount */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      ${benefit.totalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Reminders Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Smart Reminders</h3>
          
          <div className="space-y-4">
            {smartReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  {reminder.icon}
                  
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium mb-2 leading-relaxed">
                      {reminder.title}
                    </p>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {reminder.description}
                    </p>
                    
                    <button
                      onClick={reminder.actionText === 'Schedule Now' ? handleScheduleNow : handleFindProvider}
                      className={`text-${reminder.actionColor}-600 font-semibold hover:underline focus:outline-none focus:underline transition-colors duration-200`}
                    >
                      {reminder.actionText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Set Benefit Reminders Button */}
        <button
          onClick={handleSetReminders}
          className="w-full py-4 px-6 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-3"
          style={{
            background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
          }}
        >
          <Clock className="w-5 h-5" />
          <span>Set Benefit Reminders</span>
        </button>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Insurance Information</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                Your benefits reset annually. Make sure to use your allocated amounts before the end of your benefit year to maximize your coverage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      
    </div>
  );
};