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
        console.log('🔐 Initializing auth, stored user:', !!storedUser);
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Validate that the token exists and has proper structure
          if (userData && userData.token && userData.id && userData.email) {
            setUser(userData);
            console.log('✅ User loaded from localStorage:', userData.email);
          } else {
            console.log('❌ Invalid user data in localStorage, clearing...');
            localStorage.removeItem('user');
            setUser(null);
          }
        } else {
          console.log('🔐 No user found in localStorage');
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Failed to parse user from localStorage", error);
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setIsLoading(false);
        console.log('🔐 Auth initialization complete, isAuthenticated:', !!user?.token);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData: User) => {
    console.log('🔐 Logging in user:', userData.email);
    // Ensure all required fields are present
    const completeUserData = {
      ...userData,
      id: userData.id,
      token: userData.token,
      email: userData.email,
      fullName: userData.fullName
    };
    localStorage.setItem('user', JSON.stringify(completeUserData));
    setUser(completeUserData);
    console.log('✅ User logged in successfully');
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
    isAuthenticated: !!(user?.token && user?.id && user?.email) // More strict check
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
  
  const isAuthenticated = !!(context.user?.token && context.user?.id);
  console.log('🔐 useAuth hook - isAuthenticated:', isAuthenticated);
  
  return {
    ...context,
    isAuthenticated
  };
};