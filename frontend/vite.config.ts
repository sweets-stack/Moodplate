import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'https://moodplate-backend.onrender.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api'), // Keep /api prefix
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('❌ Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('🚀 Proxying request:', req.method, req.url);
            });
          }
        }
      }
    },
    // Optimize for production
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['framer-motion', '@iconscout/react-unicons']
          }
        }
      }
    }
  }
})