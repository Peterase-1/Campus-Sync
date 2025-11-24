import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middleware/auth';

export const getClasses = async (req: AuthRequest, res: Response) => {
  try {
    const classes = await prisma.class.findMany({
      where: { userId: req.user!.id },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
      include: {
        attendance: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};

export const createClass = async (req: AuthRequest, res: Response) => {
  try {
    const { name, code, professor, location, dayOfWeek, startTime, endTime, color, semester, credits } = req.body;
    const newClass = await prisma.class.create({
      data: {
        userId: req.user!.id,
        name,
        code,
        professor,
        location,
        dayOfWeek,
        startTime,
        endTime,
        color: color || '#10b981',
        semester,
        credits,
      },
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class' });
  }
};

export const updateClass = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const classItem = await prisma.class.findUnique({ where: { id } });
    if (!classItem || classItem.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const updatedClass = await prisma.class.update({
      where: { id },
      data: updates,
    });
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update class' });
  }
};

export const deleteClass = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const classItem = await prisma.class.findUnique({ where: { id } });
    if (!classItem || classItem.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Class not found' });
    }

    await prisma.class.delete({ where: { id } });
    res.json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete class' });
  }
};

//Attendance endpoints
export const getAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { classId } = req.params;
    const attendance = await prisma.attendance.findMany({
      where: {
        userId: req.user!.id,
        classId,
      },
      orderBy: { date: 'desc' },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};

export const markAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { classId, date, present, notes } = req.body;
    const attendance = await prisma.attendance.create({
      data: {
        userId: req.user!.id,
        classId,
        date: new Date(date),
        present,
        notes,
      },
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};
