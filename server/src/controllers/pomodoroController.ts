import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middleware/auth';

export const getSessions = async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await prisma.pomodoroSession.findMany({
      where: { userId: req.user!.id },
      orderBy: { startedAt: 'desc' },
      take: 50,
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

export const createSession = async (req: AuthRequest, res: Response) => {
  try {
    const { taskName, duration, type } = req.body;
    const session = await prisma.pomodoroSession.create({
      data: {
        userId: req.user!.id,
        taskName,
        duration,
        type,
      },
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
};

export const completeSession = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const session = await prisma.pomodoroSession.findUnique({ where: { id } });
    if (!session || session.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const updatedSession = await prisma.pomodoroSession.update({
      where: { id },
      data: {
        completed: true,
        endedAt: new Date(),
      },
    });
    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete session' });
  }
};

export const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await prisma.pomodoroSession.findMany({
      where: {
        userId: req.user!.id,
        completed: true,
      },
    });

    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
    const workSessions = sessions.filter(s => s.type === 'work').length;

    res.json({
      totalSessions,
      totalMinutes,
      totalHours: Math.round(totalMinutes / 60 * 10) / 10,
      workSessions,
      breakSessions: totalSessions - workSessions,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
