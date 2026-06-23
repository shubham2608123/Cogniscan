import { Router } from 'express';
import ExerciseSession from '../models/ExerciseSession.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all exercise sessions for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sessions = await ExerciseSession.find({ user_id: req.userId }).sort({ created_at: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get exercise count
router.get('/count', authMiddleware, async (req, res) => {
  try {
    const count = await ExerciseSession.countDocuments({ user_id: req.userId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save an exercise session
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { exercise_type, score, duration_ms } = req.body;
    const session = await ExerciseSession.create({
      user_id: req.userId,
      exercise_type,
      score: score || 0,
      duration_ms: duration_ms || null,
    });
    // Update streak
    await updateStreak(req.userId);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all exercise sessions for user
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await ExerciseSession.deleteMany({ user_id: req.userId });
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
