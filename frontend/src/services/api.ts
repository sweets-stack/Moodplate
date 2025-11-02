import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // In production, use the full URL from environment variable
  if (import.meta.env.PROD) {
    return (import.meta.env.VITE_API_URL as string) || 'https://moodplate-backend.onrender.com/api';
  }
  // In development, use relative path (will be proxied by Vite)
  return '/api';
};

const API_URL = getApiUrl();

console.log('🔗 API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
  
  try {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
        console.log('🔐 Added auth token to request');
      }
    }
  } catch (error) {
    console.error("❌ Could not parse user from localStorage:", error);
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error:`, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('user');
      console.log('🔓 Cleared invalid auth token');
    }
    
    return Promise.reject(error);
  }
);

export default api;