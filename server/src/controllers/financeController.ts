import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middleware/auth';

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const transactions = await prisma.financeTransaction.findMany({
      where: { userId: req.user!.id },
      orderBy: { date: 'desc' },
    });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { type, amount, description, category, date } = req.body;

    // Ensure amount is a number
    const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(parsedAmount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const transaction = await prisma.financeTransaction.create({
      data: {
        userId: req.user!.id,
        type,
        amount: parsedAmount,
        description,
        category,
        date: date ? new Date(date) : undefined,
      },
    });

    console.log('Created transaction:', transaction);
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
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
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};
