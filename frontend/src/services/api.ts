import axios from 'axios';

// Simple API configuration
const API_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || 'https://moodplate-backend.onrender.com/api')
  : '/api';

console.log('🔗 API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
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
      } else {
        console.log('❌ No valid token found in user data');
      }
    } else {
      console.log('❌ No user data found in localStorage');
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
      console.log('🔐 Unauthorized, clearing user data...');
      localStorage.removeItem('user');
      // You might want to trigger a logout here
      window.dispatchEvent(new Event('storage'));
    }
    
    return Promise.reject(error);
  }
);

export default api;