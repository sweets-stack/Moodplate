
import axios from 'axios';

// The base URL is now relative, so it will use the Vite proxy in development.
// In a production build, this relies on the web server (e.g., Nginx, Vercel)
// to proxy requests from /api to the backend service.
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  try {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (error) {
    console.error("Could not parse user from localStorage in api.ts", error);
  }
  return config;
});

export default api;
