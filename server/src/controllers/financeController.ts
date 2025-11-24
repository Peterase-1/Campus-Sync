import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middleware/auth';

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const transactions = await prisma.financeTransaction.findMany({
      where: { userId: req.user!.id },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { type, amount, description, category, date } = req.body;
    const transaction = await prisma.financeTransaction.create({
      data: {
        userId: req.user!.id,
        type,
        amount,
        description,
        category,
        date: date ? new Date(date) : undefined,
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const transaction = await prisma.financeTransaction.findUnique({ where: { id } });
    if (!transaction || transaction.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await prisma.financeTransaction.delete({ where: { id } });
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};
