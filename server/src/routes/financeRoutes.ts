import express from 'express';
import { getTransactions, createTransaction, deleteTransaction } from '../controllers/financeController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);
router.delete('/transactions/:id', deleteTransaction);

export default router;
