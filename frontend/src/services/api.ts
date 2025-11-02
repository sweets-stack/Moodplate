import axios from 'axios';

// Simple API configuration
const API_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || 'https://moodplate-backend.onrender.com/api')
  : '/api';

console.log('🔗 API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // Reduced from 30000 to 15000ms (15 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
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
      localStorage.removeItem('user');
    }
    
    return Promise.reject(error);
  }
);

export default api;