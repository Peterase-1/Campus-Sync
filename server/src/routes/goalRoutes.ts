import express from 'express';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goalController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/', getGoals);
router.post('/', createGoal);
router.patch('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;
