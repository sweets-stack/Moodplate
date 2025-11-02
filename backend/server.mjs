import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import recipeRoutes from './routes/recipeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import passportConfig from './config/passport-setup.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

console.log('🚀 Starting Moodplate backend...');
console.log('📊 Environment:', process.env.NODE_ENV);
console.log('🔐 JWT Secret available:', !!process.env.JWT_SECRET);

// Trust proxy for Render
app.set('trust proxy', 1);

// Connect to MongoDB
connectDB();

// CORS configuration - ALLOW ALL ORIGINS FOR NOW
app.use(cors({
  origin: true, // Allow all origins in production
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Security middleware
app.use(helmet());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize passport
passportConfig(passport);

// API Routes - ADD /api PREFIX
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    message: 'Moodplate Backend is running!'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Moodplate Backend Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      recipes: '/api/recipes',
      auth: '/api/auth',
      user: '/api/user'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Moodplate backend running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`📍 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

export default app;