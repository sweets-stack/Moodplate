// AuthCallbackPage.tsx - Basic version
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract user data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    
    if (userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login', { state: { error: 'Authentication failed' } });
      }
    } else {
      navigate('/login', { state: { error: 'No user data received' } });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;