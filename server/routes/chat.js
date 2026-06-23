import { Router } from 'express';
import ChatMessage from '../models/ChatMessage.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all chat messages for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ user_id: req.userId }).sort({ created_at: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a chat message
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { role, content } = req.body;
    const msg = await ChatMessage.create({
      user_id: req.userId,
      role,
      content,
    });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all chat messages for user
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await ChatMessage.deleteMany({ user_id: req.userId });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
