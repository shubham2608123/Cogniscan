import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  test_type: { type: String, enum: ['memory', 'pattern', 'reaction'], required: true },
  score: { type: Number, required: true },
  max_score: { type: Number, default: 100 },
  duration_ms: { type: Number, default: null },
  details: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('TestResult', testResultSchema);
