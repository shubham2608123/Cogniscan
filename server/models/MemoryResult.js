import mongoose from 'mongoose';

const memoryResultSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  score: { type: Number, required: true },
  total_questions: { type: Number, required: true },
  correct_answers: { type: Number, required: true },
  incorrect_answers: { type: Number, required: true },
  completion_time: { type: Number, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('MemoryResult', memoryResultSchema);
