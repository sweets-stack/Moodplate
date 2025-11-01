// backend/utils/emailService.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${mailOptions.to}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

// --- EMAIL TEMPLATES ---

export const sendWelcomeEmail = async (to, name) => {
  const mailOptions = {
    from: `"Moodplate" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Moodplate! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for joining Moodplate. We're excited to help you find the perfect recipe to match your mood.</p>
        <p>You can start generating recipes right away. Happy cooking!</p>
        <p>
          <a href="http://localhost:5173" style="background-color: #059669; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Go to Moodplate
          </a>
        </p>
        <hr/>
        <p><em>The Moodplate Team</em></p>
      </div>
    `,
  };
  await sendEmail(mailOptions);
};

export const sendLoginNotificationEmail = async (to, name) => {
  const mailOptions = {
    from: `"Moodplate" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'New Login to Your Moodplate Account',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hi, ${name}</h2>
        <p>We're just letting you know that there was a recent login to your Moodplate account.</p>
        <p>If this was you, you can safely ignore this email. If this wasn't you, please secure your account or contact support.</p>
        <hr/>
        <p><em>The Moodplate Team</em></p>
      </div>
    `,
  };
  await sendEmail(mailOptions);
};


export const sendPasswordResetEmail = async (to, token) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;
  const mailOptions = {
    from: `"Moodplate" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Password Reset Link for Moodplate',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your Moodplate account. Please click the link below to set a new password:</p>
        <p>
          <a href="${resetLink}" style="background-color: #059669; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Reset Your Password
          </a>
        </p>
        <p>This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
        <hr/>
        <p><em>The Moodplate Team</em></p>
      </div>
    `,
  };
  await sendEmail(mailOptions);
};