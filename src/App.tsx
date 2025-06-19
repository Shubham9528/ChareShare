import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WelcomePage } from './components/WelcomePage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { LoginSelectionPage } from './components/loginSelection/LoginSelectionPage';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './components/Dashboard';
import { CategoryPage } from './components/category/CategoryPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { BookingPage } from './components/booking/BookingPage';
import { MessagingPage } from './components/messaging/MessagingPage';
import { SearchPage } from './components/search/SearchPage';
import { ProviderSearchPage } from './components/providerprofile/search/SearchPage';
import { ProviderServicePage } from './components/providerservice/ProviderServicePage';
import { AuthCallback } from './components/auth/AuthCallback';
import { ProviderProfilePage } from './components/providerprofile/ProviderProfilePage';
import { ProviderSettingsPage } from './components/providerprofile/setting/ProviderSettingsPage';
import { EditProfilePage } from './components/providerprofile/setting/editprofile/EditProfilePage';
import { PrivacyPolicyPage as ProviderPrivacyPolicyPage } from './components/providerprofile/setting/privacypolicy/PrivacyPolicyPage';
import { PackageFeesPage } from './components/providerprofile/package/PackageFeesPage';
import { AddPostPage } from './components/providerprofile/addpost/AddPostPage';
import { ProviderBookingsPage } from './components/providerprofile/bookings/ProviderBookingsPage';
import { ProviderHomePage } from './components/providerprofile/home/ProviderHomePage';
import { ProviderMessagesPage } from './components/providerprofile/message/ProviderMessagesPage';
import { AboutPage } from './components/providerprofile/setting/about/AboutPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { EditProfilePage as PatientEditProfilePage } from './components/settings/EditProfilePage';
import { UploadDocumentPage, CameraScanPage } from './components/settings/uploaddocument';
import { FavoritesPage } from './components/settings/favorites';
import { InsuranceBenefitsPage } from './components/settings/insurance';
import { AppointmentBookingPage } from './components/providerservice/appointment/AppointmentBookingPage';
import { PackageSelectionPage } from './components/providerservice/package/PackageSelectionPage';
import { ConfirmDetailsPage } from './components/providerservice/confirmdetails/ConfirmDetailsPage';
import { PrivacyPolicyPage } from './components/settings/policy';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <PublicRoute>
          <WelcomePage />
        </PublicRoute>
      } />
      
      <Route path="/onboarding" element={
        <PublicRoute>
          <OnboardingFlow 
            onComplete={() => window.location.href = '/login-selection'}
            onBackToWelcome={() => window.location.href = '/'}
          />
        </PublicRoute>
      } />
      
      <Route path="/login-selection" element={
        <PublicRoute>
          <LoginSelectionPage 
            onSelectUserType={(userType) => window.location.href = `/auth?type=${userType}`}
          />
        </PublicRoute>
      } />
      
      <Route path="/auth" element={
        <PublicRoute>
          <AuthPage 
            onBack={() => window.location.href = '/login-selection'}
            onAuthSuccess={() => window.location.href = '/dashboard'}
          />
        </PublicRoute>
      } />

      {/* Auth Callback Route */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Browse without authentication */}
      <Route path="/browse" element={<CategoryPage />} />
      <Route path="/browse/search" element={<SearchPage onBack={() => window.location.href = '/browse'} />} />
      <Route path="/browse/providers/:category" element={<ProviderServicePage onBack={() => window.location.href = '/browse'} />} />

      {/* Patient Routes */}
      <Route path="/patient/category" element={
        <ProtectedRoute>
          <CategoryPage />
        </ProtectedRoute>
      } />
      
      <Route path="/patient/profile" element={
        <ProtectedRoute>
          <ProfilePage onBack={() => window.location.href = '/patient/category'} />
        </ProtectedRoute>
      } />

      {/* Patient Settings Route */}
      <Route path="/patient/profile/setting" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />

      {/* Patient Edit Profile Route */}
      <Route path="/patient/profile/setting/editprofile" element={
        <ProtectedRoute>
          <PatientEditProfilePage />
        </ProtectedRoute>
      } />

      {/* Patient Upload Document Route */}
      <Route path="/patient/profile/setting/uploaddoc" element={
        <ProtectedRoute>
          <UploadDocumentPage />
        </ProtectedRoute>
      } />

      {/* Patient Camera Scan Route */}
      <Route path="/patient/profile/setting/camerascan" element={
        <ProtectedRoute>
          <CameraScanPage />
        </ProtectedRoute>
      } />

      {/* Patient Favorites Route */}
      <Route path="/patient/profile/setting/favorite" element={
        <ProtectedRoute>
          <FavoritesPage />
        </ProtectedRoute>
      } />

      {/* Patient Insurance Route */}
      <Route path="/patient/profile/setting/insurance" element={
        <ProtectedRoute>
          <InsuranceBenefitsPage />
        </ProtectedRoute>
      } />
      
      {/* Patient Privacy Policy Route */}
      <Route path="/patient/profile/setting/policy" element={
        <ProtectedRoute>
          <PrivacyPolicyPage />
        </ProtectedRoute>
      } />
      
      <Route path="/patient/bookings" element={
        <ProtectedRoute>
          <BookingPage onBack={() => window.location.href = '/patient/category'} />
        </ProtectedRoute>
      } />
      
      <Route path="/patient/messages" element={
        <ProtectedRoute>
          <MessagingPage onBack={() => window.location.href = '/patient/category'} />
        </ProtectedRoute>
      } />
      
      <Route path="/patient/search" element={
        <ProtectedRoute>
          <SearchPage onBack={() => window.location.href = '/patient/category'} />
        </ProtectedRoute>
      } />
      
      <Route path="/patient/providers/:category" element={
        <ProtectedRoute>
          <ProviderServicePage onBack={() => window.location.href = '/patient/category'} />
        </ProtectedRoute>
      } />

      {/* Selected Provider Profile Route */}
      <Route path="/patient/providers/:category/selectedprofile" element={
        <ProtectedRoute>
          <ProviderServicePage onBack={() => window.location.href = '/patient/category'} />
        </ProtectedRoute>
      } />

      {/* Appointment Booking Route */}
      <Route path="/patient/providers/:category/selectedprofile/selectappoinment" element={
        <ProtectedRoute>
          <AppointmentBookingPage onBack={() => window.history.back()} />
        </ProtectedRoute>
      } />

      {/* Package Selection Route */}
      <Route path="/patient/providers/:category/selectedprofile/selectappoinment/package" element={
        <ProtectedRoute>
          <PackageSelectionPage onBack={() => window.history.back()} />
        </ProtectedRoute>
      } />

      {/* Confirm Details Route - NEW */}
      <Route path="/patient/providers/:category/selectedprofile/selectappoinment/packages/bookappoinment" element={
        <ProtectedRoute>
          <ConfirmDetailsPage onBack={() => window.history.back()} />
        </ProtectedRoute>
      } />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* Provider Profile Route */}
      <Route path="/provider" element={
        <ProtectedRoute>
          <ProviderProfilePage />
        </ProtectedRoute>
      } />

      {/* Provider Home Route */}
      <Route path="/provider/home" element={
        <ProtectedRoute>
          <ProviderHomePage />
        </ProtectedRoute>
      } />

      {/* Provider Search Route */}
      <Route path="/provider/search" element={
        <ProtectedRoute>
          <ProviderSearchPage />
        </ProtectedRoute>
      } />

      {/* Provider Messages Route */}
      <Route path="/provider/message" element={
        <ProtectedRoute>
          <ProviderMessagesPage />
        </ProtectedRoute>
      } />

      {/* Provider Settings Route */}
      <Route path="/provider/setting" element={
        <ProtectedRoute>
          <ProviderSettingsPage />
        </ProtectedRoute>
      } />

      {/* Provider Edit Profile Route */}
      <Route path="/provider/setting/editprofile" element={
        <ProtectedRoute>
          <EditProfilePage />
        </ProtectedRoute>
      } />

      {/* Provider Privacy Policy Route */}
      <Route path="/provider/setting/policy" element={
        <ProtectedRoute>
          <ProviderPrivacyPolicyPage />
        </ProtectedRoute>
      } />

      {/* Provider About Route */}
      <Route path="/provider/setting/about" element={
        <ProtectedRoute>
          <AboutPage />
        </ProtectedRoute>
      } />

      {/* Provider Package Fees Route */}
      <Route path="/provider/setting/package" element={
        <ProtectedRoute>
          <PackageFeesPage />
        </ProtectedRoute>
      } />

      {/* Provider Add Post Route */}
      <Route path="/provider/addpost" element={
        <ProtectedRoute>
          <AddPostPage />
        </ProtectedRoute>
      } />

      {/* Provider Bookings Route */}
      <Route path="/provider/booking" element={
        <ProtectedRoute>
          <ProviderBookingsPage />
        </ProtectedRoute>
      } />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;