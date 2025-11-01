import mongoose from 'mongoose';

const resetTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expires: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Auto-delete expired tokens after 1 hour
resetTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.model('ResetToken', resetTokenSchema);