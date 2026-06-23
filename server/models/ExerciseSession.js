import mongoose from 'mongoose';

const exerciseSessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  exercise_type: { type: String, required: true },
  score: { type: Number, default: 0 },
  duration_ms: { type: Number, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('ExerciseSession', exerciseSessionSchema);
