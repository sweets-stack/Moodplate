import axios from 'axios';

const API_URL = 'http://https://moodplate-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  try {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.token) {
config.headers.Authorization = `Bearer ${user.token}`;      }
    }
  } catch (error) {
    console.error("Could not parse user from localStorage in api.ts", error);
  }
  return config;
});

export default api;
