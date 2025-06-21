import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const usePatientNavigation = (isAuthenticated: boolean) => {
  const [activeNavTab, setActiveNavTab] = useState('profile');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleTabChange = (tab: string) => {
    setActiveNavTab(tab);
    
    const basePath = isAuthenticated ? '/patient' : '/browse';
    
    switch (tab) {
      case 'home':
        if (isAuthenticated) {
          navigate('/patient/category');
        } else {
          navigate('/browse');
        }
        break;
      case 'search':
        navigate(`${basePath}/search`);
        break;
      case 'booking':
        if (isAuthenticated) {
          navigate('/patient/bookings');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'message':
        if (isAuthenticated) {
          navigate('/patient/messages');
        } else {
          navigate('/login-selection');
        }
        break;
      case 'profile':
        if (!isAuthenticated) {
          navigate('/login-selection');
        }
        break;
    }
  };

  return {
    activeNavTab,
    setActiveNavTab,
    handleTabChange
  };
}; 