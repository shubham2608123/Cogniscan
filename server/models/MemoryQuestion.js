import mongoose from 'mongoose';

const memoryQuestionSchema = new mongoose.Schema({
  memory_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MemoryVault', required: true, index: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  question: { type: String, required: true },
  options: [{ type: String }],
  correct_answer: { type: String, required: true },
  question_type: { type: String, enum: ['mcq', 'true_false', 'recall'], required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('MemoryQuestion', memoryQuestionSchema);
