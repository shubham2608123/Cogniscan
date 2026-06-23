import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import testRoutes from './routes/tests.js';
import exerciseRoutes from './routes/exercises.js';
import chatRoutes from './routes/chat.js';
import memoryVaultRoutes from './routes/memoryVault.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/memory-vault', memoryVaultRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Connect to MongoDB and start server
const MONGO_URI = process.env.MONGO_URI || 'mongodb://soham7dalvi_db_user:LqobOjfRXebVCJel@ac-2d76iet-shard-00-00.cvjqiiz.mongodb.net:27017,ac-2d76iet-shard-00-01.cvjqiiz.mongodb.net:27017,ac-2d76iet-shard-00-02.cvjqiiz.mongodb.net:27017/?ssl=true&replicaSet=atlas-10rfps-shard-0&authSource=admin&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  heartbeatFrequencyMS: 10000,
})
  .then(() => {
    console.log('[MongoDB] Connected');
    app.listen(PORT, () => console.log(`[Server] Running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('[MongoDB] Connection error:', err.message);
    console.error('[MongoDB] Make sure your network can resolve SRV records for MongoDB Atlas.');
    console.error('[MongoDB] Try connecting from a different network or use a direct connection string.');
    process.exit(1);
  });
