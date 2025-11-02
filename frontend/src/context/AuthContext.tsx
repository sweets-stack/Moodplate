import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Validate that the token exists
          if (userData && userData.token) {
            setUser(userData);
            console.log('🔐 User loaded from localStorage:', userData.email);
          } else {
            console.log('❌ Invalid user data in localStorage');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error("❌ Failed to parse user from localStorage", error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData: User) => {
    console.log('🔐 Logging in user:', userData.email);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log('🔐 Logging out user');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user?.token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const isAuthenticated = !!context.user?.token;
  
  return {
    ...context,
    isAuthenticated
  };
};