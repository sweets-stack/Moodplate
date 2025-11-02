// backend/server.js
import dotenv from 'dotenv';

// Load environment variables
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
// FIX: Ensure PORT is a number, as app.listen expects a number for the port.
const PORT = Number(process.env.PORT) || 3001;

console.log('🚀 Starting Moodplate backend...');

// --- FIX: Trust the proxy to get correct protocol (https) ---
// This is crucial for running behind a proxy like Render's.
app.set('trust proxy', 1);
// -----------------------------------------------------------

// Connect to MongoDB
connectDB();

// Security middleware
// FIX: Removed explicit path '/' to resolve "No overload matches this call" TypeScript error.
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://moodplate-frontend.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS with options
// FIX: To maintain consistency and prevent potential type errors, removed explicit root path.
app.use(cors(corsOptions));


// FIX: Removed explicit path '/' to resolve "No overload matches this call" TypeScript error.
app.use(express.json({ limit: '10mb' }));
// FIX: Removed explicit path '/' to resolve "No overload matches this call" TypeScript error.
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
// FIX: Removed explicit path '/' to resolve "No overload matches this call" TypeScript error.
app.use(limiter);

// Session configuration
// FIX: Removed explicit path '/' to resolve "No overload matches this call" TypeScript error.
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-site cookies, requires secure=true
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport middleware
// FIX: To maintain consistency and prevent potential type errors, removed explicit root path.
app.use(passport.initialize());
// FIX: To maintain consistency and prevent potential type errors, removed explicit root path.
app.use(passport.session());

// Initialize passport
passportConfig(passport);

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Moodplate backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});

export default app;