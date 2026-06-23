import { Router } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import MemoryVault from '../models/MemoryVault.js';
import MemoryQuestion from '../models/MemoryQuestion.js';
import MemoryResult from '../models/MemoryResult.js';
import { authMiddleware } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop() || 'jpg';
    cb(null, `${req.userId}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

// Upload image
router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Get all memories
router.get('/memories', authMiddleware, async (req, res) => {
  try {
    const memories = await MemoryVault.find({ user_id: req.userId }).sort({ created_at: -1 });
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save memory with questions
router.post('/memories', authMiddleware, async (req, res) => {
  try {
    const { title, description, image_url, category, date, questions } = req.body;
    const memory = await MemoryVault.create({
      user_id: req.userId,
      title,
      description,
      image_url: image_url || null,
      category: category || 'other',
      date: date || null,
    });

    if (questions && questions.length > 0) {
      const questionDocs = questions.map((q) => ({
        memory_id: memory._id,
        user_id: req.userId,
        question: q.question,
        options: q.options || [],
        correct_answer: q.correct_answer,
        question_type: q.question_type,
        difficulty: q.difficulty,
      }));
      await MemoryQuestion.insertMany(questionDocs);
    }

    res.json(memory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a memory and its questions
router.delete('/memories/:id', authMiddleware, async (req, res) => {
  try {
    console.log('[Delete] memoryId:', req.params.id);
    const memoryId = new mongoose.Types.ObjectId(req.params.id);
    const qResult = await MemoryQuestion.deleteMany({ memory_id: memoryId });
    console.log('[Delete] questions deleted:', qResult.deletedCount);
    const mResult = await MemoryVault.findByIdAndDelete(memoryId);
    console.log('[Delete] memory deleted:', !!mResult);
    res.json({ ok: true });
  } catch (err) {
    console.error('[Delete] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get all questions for user
router.get('/questions', authMiddleware, async (req, res) => {
  try {
    const questions = await MemoryQuestion.find({ user_id: req.userId }).sort({ created_at: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get random questions for a test
router.get('/questions/random', authMiddleware, async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const questions = await MemoryQuestion.find({ user_id: req.userId });
    const shuffled = questions.sort(() => Math.random() - 0.5);
    res.json(shuffled.slice(0, Math.min(count, shuffled.length)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save memory test result
router.post('/results', authMiddleware, async (req, res) => {
  try {
    const { score, total_questions, correct_answers, incorrect_answers, completion_time } = req.body;
    const result = await MemoryResult.create({
      user_id: req.userId,
      score,
      total_questions,
      correct_answers,
      incorrect_answers,
      completion_time,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all memory results
router.get('/results', authMiddleware, async (req, res) => {
  try {
    const results = await MemoryResult.find({ user_id: req.userId }).sort({ created_at: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
