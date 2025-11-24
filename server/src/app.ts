import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes';
import habitRoutes from './routes/habitRoutes';
import financeRoutes from './routes/financeRoutes';
import studyRoutes from './routes/studyRoutes';
import goalRoutes from './routes/goalRoutes';
import timetableRoutes from './routes/timetableRoutes';
import pomodoroRoutes from './routes/pomodoroRoutes';
import notesRoutes from './routes/notesRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Campus Sync API is running');
});

export default app;
