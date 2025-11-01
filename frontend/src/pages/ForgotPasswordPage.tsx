import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', { email });
      // --- THIS IS THE CORRECTED USER MESSAGE ---
      setMessage(response.data.message); 
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
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Forgot Password</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Enter your email to receive a reset link.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <p className="text-green-500 text-center font-semibold bg-green-500/10 p-3 rounded-md">{message}</p>}
          {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 mt-1 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl"
            disabled={!!message} // Disable input after success
          />

          <button type="submit" disabled={isLoading || !!message} className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-xl disabled:opacity-50">
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <p className="text-center text-sm">
          <Link to="/login" className="font-medium text-green-500 hover:underline">Back to Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;