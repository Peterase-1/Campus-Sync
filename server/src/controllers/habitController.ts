import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middleware/auth';

export const getHabits = async (req: AuthRequest, res: Response) => {
  try {
    const habits = await prisma.habit.findMany({
      where: { userId: req.user!.id },
    });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
};

export const createHabit = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, frequency } = req.body;
    const habit = await prisma.habit.create({
      data: {
        userId: req.user!.id,
        name,
        description,
        frequency,
      },
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

export const updateHabit = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const habit = await prisma.habit.findUnique({ where: { id } });
    if (!habit || habit.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: updates,
    });
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update habit' });
  }
};

export const deleteHabit = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const habit = await prisma.habit.findUnique({ where: { id } });
    if (!habit || habit.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    await prisma.habit.delete({ where: { id } });
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete habit' });
  }
};
