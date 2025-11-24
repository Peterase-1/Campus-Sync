import express from 'express';
import { getSessions, createSession, completeSession, getStats } from '../controllers/pomodoroController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/stats', getStats);
router.get('/', getSessions);
router.post('/', createSession);
router.patch('/:id/complete', completeSession);

export default router;
