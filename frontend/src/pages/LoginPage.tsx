import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const message = (location.state as any)?.message;
  const from = (location.state as any)?.from || '/';

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);
  
  try {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.data && response.data.token) {
      login(response.data);
      navigate(from, { replace: true });
    } else {
      setError('Invalid response from server');
    }
  } catch (err: any) {
    console.error('Login error:', err);
    setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 flex items-center justify-center lg:grid lg:grid-cols-2 pt-16 lg:pt-0">
      {/* Left Side - Feature Showcase (Desktop only) */}
      <div className="hidden lg:flex flex-col items-start justify-center p-8 xl:p-12 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 text-white">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <h1 className="text-4xl xl:text-5xl font-black leading-tight mb-6">
            Find Your Flavor. <br /> Cook Your Mood.
          </h1>
          <div className="space-y-4 xl:space-y-6">
            <FeatureItem 
              icon="🍲" 
              title="Endless Inspiration" 
              description="Discover hundreds of recipes tailored to how you feel, right now." 
            />
            <FeatureItem 
              icon="❤️" 
              title="Save Your Favorites" 
              description="Create an account to build your personal collection of must-try dishes." 
            />
          </div>
          <p className="mt-12 xl:mt-20 text-xl xl:text-2xl font-bold">Moodplate</p>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col items-center justify-center w-full p-4 sm:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <div className="bg-white dark:bg-gray-900/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold text-center">Welcome back! 👋</h2>
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-1">
              Login to continue to your account.
            </p>
            
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-2 sm:p-3 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-center text-xs sm:text-sm font-semibold"
              >
                {message}
              </motion.div>
            )}
            
            {error && (
              <p className="mt-3 p-2 text-red-500 text-center font-semibold bg-red-500/10 rounded-md text-xs sm:text-sm">
                {error}
              </p>
            )}
            
            <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <InputField 
                label="E-mail address" 
                type="email" 
                value={email} 
                onChange={setEmail} 
                placeholder="you@example.com" 
                required 
              />
              <PasswordField 
                label="Password" 
                value={password} 
                onChange={setPassword} 
              />
              
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    type="checkbox" 
                    className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" 
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-600 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className="font-semibold text-green-500 hover:underline text-xs sm:text-sm"
                >
                  Forgot password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full py-2.5 sm:py-3 mt-2 sm:mt-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-transform transform active:scale-95 disabled:opacity-50 text-sm sm:text-base"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="relative my-4 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900/50 text-gray-500 text-xs sm:text-sm">
                  or sign in with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a 
                href="http://localhost:3001/api/auth/github" 
                className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-xs sm:text-sm"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">Github</span>
              </a>
              <a 
                href="http://localhost:3001/api/auth/google" 
                className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-xs sm:text-sm"
              >
                <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">Google</span>
              </a>
            </div>
            
            <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-4 sm:mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-green-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 xl:gap-4">
    <span className="text-2xl xl:text-3xl mt-0.5">{icon}</span>
    <div>
      <h3 className="text-lg xl:text-xl font-bold">{title}</h3>
      <p className="text-white/80 text-sm xl:text-base">{description}</p>
    </div>
  </div>
);

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder, required = false }) => (
  <div>
    <label className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 sm:px-4 py-2 sm:py-3 mt-1 bg-white dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-sm sm:text-base"
    />
  </div>
);

const PasswordField: React.FC<PasswordFieldProps> = ({ label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>
      <div className="relative mt-1">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition pr-10 text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
        >
          {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;