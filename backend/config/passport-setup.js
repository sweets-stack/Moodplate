import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
import User from '../models/User.js';

export default function(passport) {
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Local Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        return done(null, user);
      } else {
        user = new User({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex') // Random password for OAuth users
        });

        await user.save();
        return done(null, user);
      }
    } catch (error) {
      return done(error, null);
    }
  }));

  // GitHub OAuth Strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails?.[0]?.value });

      if (user) {
        return done(null, user);
      } else {
        user = new User({
          fullName: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
          password: crypto.randomBytes(20).toString('hex') // Random password for OAuth users
        });

        await user.save();
        return done(null, user);
      }
    } catch (error) {
      return done(error, null);
    }
  }));
}