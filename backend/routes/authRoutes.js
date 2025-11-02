import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import ResetToken from '../models/ResetToken.js';
import { sendWelcomeEmail, sendLoginNotificationEmail, sendPasswordResetEmail } from '../utils/emailService.js';

const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://moodplate-frontend.onrender.com';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || 'moodplate_fallback_jwt_secret_2024_development_only';
  return secret;
};

// --- LOCAL AUTH ROUTES ---
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    console.log('📝 Registration attempt for:', email);

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'Full name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    // Create new user
    const newUser = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : '',
      password: password
    });

    await newUser.save();
    console.log('✅ User saved to database:', newUser.email);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      getJwtSecret(),
      { expiresIn: '30d' }
    );

    const userResponse = {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      token: token
    };

    console.log('✅ Registration successful for:', email);
    
    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, fullName)
      .then(() => console.log('✅ Welcome email sent to:', email))
      .catch(emailError => console.error('❌ Failed to send welcome email:', emailError));

    res.status(201).json(userResponse);
    
  } catch (error) {
    console.error('❌ Registration route error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }
    
    res.status(500).json({ error: 'Registration failed due to server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('📝 Login attempt for:', email);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    console.log('👤 User found:', !!user);

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password using the model method
    console.log('🔐 Comparing passwords...');
    const isPasswordValid = await user.comparePassword(password);
    console.log('✅ Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      getJwtSecret(),
      { expiresIn: '30d' }
    );

    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: token
    };

    console.log('✅ Login successful for:', user.email);
    
    // Send login notification email (non-blocking)
    sendLoginNotificationEmail(user.email, user.fullName)
      .then(() => console.log('✅ Login notification email sent to:', user.email))
      .catch(emailError => console.error('❌ Failed to send login notification email:', emailError));

    res.json(userResponse);
    
  } catch (error) {
    console.error('❌ Login route error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// --- OAUTH ROUTES ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/login`,
    session: true
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, getJwtSecret(), { expiresIn: '30d' });
    const user = {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      token
    };
    
    try {
      sendWelcomeEmail(req.user.email, req.user.fullName)
        .then(() => console.log('✅ Welcome email sent to OAuth user:', req.user.email))
        .catch(err => console.error('❌ Failed to send OAuth welcome email:', err));
    } catch (emailError) {
      console.error('❌ OAuth welcome email error:', emailError);
    }
    
    res.redirect(`${FRONTEND_URL}/auth/callback?user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${FRONTEND_URL}/login`,
    session: true
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, getJwtSecret(), { expiresIn: '30d' });
    const user = {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      token
    };
    
    try {
      sendWelcomeEmail(req.user.email, req.user.fullName)
        .then(() => console.log('✅ Welcome email sent to OAuth user:', req.user.email))
        .catch(err => console.error('❌ Failed to send OAuth welcome email:', err));
    } catch (emailError) {
      console.error('❌ OAuth welcome email error:', emailError);
    }
    
    res.redirect(`${FRONTEND_URL}/auth/callback?user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

// --- PASSWORD RESET ROUTES ---
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      // Don't reveal whether email exists or not
      return res.json({ message: 'If the email exists, a reset link has been sent' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Remove any existing tokens for this user
    await ResetToken.deleteMany({ email });
    
    // Create new reset token
    const newResetToken = new ResetToken({
      email,
      token: resetToken,
      expires: tokenExpiry
    });
    
    await newResetToken.save();

    // Send reset email
    try {
      await sendPasswordResetEmail(email, resetToken);
      console.log('✅ Password reset email sent to:', email);
      res.json({ message: 'If the email exists, a reset link has been sent' });
    } catch (emailError) {
      console.error('❌ Failed to send reset email:', emailError);
      res.status(500).json({ error: 'Failed to send reset email' });
    }
    
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Find the reset token
    const tokenData = await ResetToken.findOne({ token });
    
    if (!tokenData) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    if (Date.now() > tokenData.expires) {
      // Remove expired token
      await ResetToken.deleteOne({ token });
      return res.status(400).json({ error: 'Reset token has expired' });
    }

    // Find user by email
    const user = await User.findOne({ email: tokenData.email });
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Update password (will be hashed automatically by pre-save middleware)
    user.password = newPassword;
    await user.save();

    // Remove used token
    await ResetToken.deleteOne({ token });

    // Send password changed confirmation email
    try {
      // You might want to create a sendPasswordChangedEmail function
      console.log('✅ Password successfully reset for:', user.email);
    } catch (emailError) {
      console.error('❌ Failed to send password changed notification:', emailError);
    }

    res.json({ message: 'Password reset successfully' });
    
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

export default router;
