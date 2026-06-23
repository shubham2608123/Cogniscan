import mongoose from 'mongoose';

const memoryVaultSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, default: null },
  category: { type: String, default: 'other' },
  date: { type: String, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('MemoryVault', memoryVaultSchema);
