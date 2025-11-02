import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/user';

const AuthCallbackPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userParam = params.get('user');

        if (userParam) {
            try {
                const userData: User = JSON.parse(decodeURIComponent(userParam));
                if (userData && userData.token) {
                    // This is the key fix: login() updates the context
                    login(userData);
                    // Then, navigate using the router to preserve state
                    navigate('/', { replace: true });
                } else {
                    // Invalid user data
                    navigate('/login', { replace: true });
                }
            } catch (error) {
                console.error("Failed to parse user data from callback", error);
                navigate('/login', { replace: true });
            }
        } else {
            // No user data in URL
            navigate('/login', { replace: true });
        }
    }, [location, login, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="animate-pulse">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Authenticating...</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Please wait while we log you in.</p>
            </div>
        </div>
    );
};

export default AuthCallbackPage;
