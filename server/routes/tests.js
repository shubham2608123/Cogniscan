import { Router } from 'express';
import TestResult from '../models/TestResult.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all test results for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const results = await TestResult.find({ user_id: req.userId }).sort({ created_at: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a test result
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { test_type, score, max_score, duration_ms, details } = req.body;
    const result = await TestResult.create({
      user_id: req.userId,
      test_type,
      score,
      max_score: max_score || 100,
      duration_ms: duration_ms || null,
      details: details || null,
    });
    // Update streak
    await updateStreak(req.userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all test results for user
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await TestResult.deleteMany({ user_id: req.userId });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function updateStreak(userId) {
  const user = await User.findById(userId);
  if (!user) return;
  const today = new Date().toISOString().slice(0, 10);
  if (user.last_activity_date === today) return;

  let newStreak = 1;
  if (user.last_activity_date) {
    const last = new Date(user.last_activity_date);
    const diff = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 1) newStreak = (user.current_streak || 0) + 1;
  }
  const longest = Math.max(user.longest_streak || 0, newStreak);
  await User.findByIdAndUpdate(userId, {
    current_streak: newStreak,
    longest_streak: longest,
    last_activity_date: today,
  });
}

export default router;
