import express from 'express';
import { getHabits, createHabit, updateHabit, deleteHabit } from '../controllers/habitController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/', getHabits);
router.post('/', createHabit);
router.patch('/:id', updateHabit);
router.delete('/:id', deleteHabit);

export default router;
