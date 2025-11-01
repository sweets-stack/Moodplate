import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setMessage('');
    setIsLoading(true);
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-black rounded-2xl shadow-xl"
      >
        <div className="text-center">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Reset Your Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <p className="text-green-500 text-center font-semibold">{message}</p>}
          {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
            className="w-full px-4 py-3 mt-1 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
            className="w-full px-4 py-3 mt-1 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl"
          />

          <button type="submit" disabled={isLoading || !!message} className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-xl">
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
         {message && <p className="text-center text-sm"><Link to="/login" className="font-medium text-green-500 hover:underline">Proceed to Login</Link></p>}
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;