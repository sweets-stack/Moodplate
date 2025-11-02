import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // FIX: Replaced `process.cwd()` with `'.'` to resolve a TypeScript type error where `process.cwd` was not found.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true, // Allows access from network
      proxy: {
        // Proxy requests from /api to the backend server
        '/api': {
          target: env.VITE_API_URL || 'http://moodplate-backend.onrender.com',
          changeOrigin: true, // needed for virtual hosted sites
          secure: false, // if your backend is http
        }
      }
    }
  }
})
