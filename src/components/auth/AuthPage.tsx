import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, Stethoscope, Heart, Loader2 } from 'lucide-react';
import { CareCircleLogo } from '../loginSelection/CareCircleLogo';
import { useAuth } from '../../contexts/AuthContext';

interface AuthPageProps {
  onBack?: () => void;
  userType?: 'provider' | 'patient';
  onAuthSuccess?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBack, userType: propUserType, onAuthSuccess }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp, signIn, signInWithPhone, signInWithGoogle, loading } = useAuth();
  
  // Get user type from URL params or props
  const userType = propUserType || (searchParams.get('type') as 'provider' | 'patient') || 'patient';
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Store user type in localStorage when component mounts
  useEffect(() => {
    console.log('AuthPage: Setting user type in localStorage:', userType);
    localStorage.setItem('selectedUserType', userType);
  }, [userType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    if (isSignUp) {
      if (!formData.firstName.trim()) {
        setError('First name is required');
        return false;
      }
      if (!formData.lastName.trim()) {
        setError('Last name is required');
        return false;
      }
      if (!formData.email.trim()) {
        setError('Email is required');
        return false;
      }
      if (!formData.phone.trim()) {
        setError('Phone number is required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }

    if (loginMethod === 'email' && !formData.email) {
      setError('Email is required');
      return false;
    }

    if (loginMethod === 'phone' && !formData.phone) {
      setError('Phone number is required');
      return false;
    }

    if (!formData.password) {
      setError('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
        const { error } = await signUp(
          formData.email,
          formData.password,
          userType,
          fullName,
          formData.phone || undefined
        );

        if (error) {
          setError(error.message);
        } else {
          setSuccess('Account created successfully! Please check your email to verify your account.');
          // Redirect based on user type
          setTimeout(() => {
            if (userType === 'provider') {
              navigate('/provider');
            } else {
              navigate('/dashboard');
            }
          }, 1500);
        }
      } else {
        const { error } = loginMethod === 'email' 
          ? await signIn(formData.email, formData.password)
          : await signInWithPhone(formData.phone, formData.password);

        if (error) {
          // Handle specific error messages for better user experience
          if (error.message === 'Invalid login credentials') {
            setError('Incorrect email or password. Please try again.');
          } else {
            setError(error.message);
          }
        } else {
          setSuccess('Signed in successfully!');
          // Redirect based on user type
          setTimeout(() => {
            if (userType === 'provider') {
              navigate('/provider');
            } else {
              navigate('/dashboard');
            }
          }, 500);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    // Store user type before Google OAuth redirect
    console.log('AuthPage: Storing user type before Google OAuth:', userType);
    localStorage.setItem('selectedUserType', userType);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/login-selection');
    }
  };

  // Theme configuration based on user type
  const theme = {
    provider: {
      primaryColor: 'blue-600',
      primaryHover: 'blue-700',
      accentColor: 'indigo-600',
      icon: Stethoscope,
      welcomeTitle: isSignUp ? 'Join as a Provider' : 'Welcome Back, Doctor!',
      welcomeSubtitle: isSignUp 
        ? 'Create your provider account to start managing your practice' 
        : "Ready to help your patients today?",
      buttonText: isSignUp ? 'Create Provider Account' : 'Sign In to Practice',
      signUpPrompt: "Ready to start your practice?",
      signInPrompt: "Already providing care?"
    },
    patient: {
      primaryColor: 'emerald-600',
      primaryHover: 'emerald-700',
      accentColor: 'teal-600',
      icon: Heart,
      welcomeTitle: isSignUp ? 'Join CareCircle' : 'Welcome Back!',
      welcomeSubtitle: isSignUp 
        ? 'Create your account to start your health journey' 
        : "Hope you're feeling well today.",
      buttonText: isSignUp ? 'Create Account' : 'Sign In',
      signUpPrompt: "New to CareCircle?",
      signInPrompt: "Already have an account?"
    }
  };

  const currentTheme = theme[userType];
  const IconComponent = currentTheme.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: '#FFFFFF' }}>
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          disabled={loading || isSubmitting}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Logo with User Type Indicator */}
        <div className="text-center space-y-4">
          <CareCircleLogo />
          
          {/* User Type Badge */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200`}>
            <IconComponent className={`w-4 h-4 text-${currentTheme.primaryColor}`} />
            <span className={`text-sm font-medium text-${currentTheme.primaryColor} capitalize`}>
              {userType} Portal
            </span>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentTheme.welcomeTitle}
          </h1>
          <p className="text-gray-600">
            {currentTheme.welcomeSubtitle}
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            {success}
          </div>
        )}

        {/* Login Method Toggle (only for sign in) */}
        {!isSignUp && (
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              disabled={loading || isSubmitting}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                loginMethod === 'phone'
                  ? 'text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={loginMethod === 'phone' ? {
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              } : {}}
            >
              Phone Number
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              disabled={loading || isSubmitting}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                loginMethod === 'email'
                  ? 'text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={loginMethod === 'email' ? {
                background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
              } : {}}
            >
              Email
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                  disabled={loading || isSubmitting}
                />
              </div>
              
              {/* Last Name */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                  disabled={loading || isSubmitting}
                />
              </div>
            </div>
          )}

          {/* Email Field (always shown for sign up, conditionally for sign in) */}
          {(isSignUp || loginMethod === 'email') && (
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder={`Enter your ${userType === 'provider' ? 'professional ' : ''}email`}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
                disabled={loading || isSubmitting}
              />
            </div>
          )}

          {/* Phone Field (always shown for sign up, conditionally for sign in) */}
          {(isSignUp || loginMethod === 'phone') && (
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required={isSignUp || loginMethod === 'phone'}
                disabled={loading || isSubmitting}
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
              required
              disabled={loading || isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              disabled={loading || isSubmitting}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {isSignUp && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
                disabled={loading || isSubmitting}
              />
            </div>
          )}

          {/* Forgot Password Link (only for sign in) */}
          {!isSignUp && (
            <div className="text-right">
              <button 
                type="button"
                className={`text-${currentTheme.primaryColor} hover:text-${currentTheme.primaryHover} font-medium transition-colors duration-200 hover:underline focus:outline-none focus:underline text-sm`}
                disabled={loading || isSubmitting}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Login Button with Custom Gradient */}
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            style={{
              background: 'linear-gradient(180deg, #3B82F6 0%, #234C90 100%)'
            }}
          >
            {(loading || isSubmitting) && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? 'Please wait...' : currentTheme.buttonText}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className={`relative flex justify-center text-sm`}>
            <span className={`px-4 bg-white text-gray-500`}>
              or {isSignUp ? 'sign up' : 'login'} with
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading || isSubmitting}
          className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {(loading || isSubmitting) ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          <span>Login with Google</span>
        </button>

        {/* Toggle Sign Up/Sign In */}
        <div className="text-center">
          <p className="text-gray-600">
            {isSignUp ? currentTheme.signInPrompt : currentTheme.signUpPrompt}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`text-${currentTheme.primaryColor} hover:text-${currentTheme.primaryHover} font-semibold transition-colors duration-200 hover:underline focus:outline-none focus:underline`}
              disabled={loading || isSubmitting}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};