import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  full_name: { type: String, default: '' },
  role: { type: String, enum: ['patient', 'caregiver'], default: 'patient' },
  current_streak: { type: Number, default: 0 },
  longest_streak: { type: Number, default: 0 },
  last_activity_date: { type: String, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('User', userSchema);
