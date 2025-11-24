import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middleware/auth';

// Notes
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await prisma.studyNote.findMany({
      where: { userId: req.user!.id },
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, subject } = req.body;
    const note = await prisma.studyNote.create({
      data: {
        userId: req.user!.id,
        title,
        content,
        subject,
      },
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await prisma.studyNote.findUnique({ where: { id } });
    if (!note || note.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await prisma.studyNote.delete({ where: { id } });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};

// Tasks
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await prisma.studyTask.findMany({
      where: { userId: req.user!.id },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const task = await prisma.studyTask.create({
      data: {
        userId: req.user!.id,
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await prisma.studyTask.findUnique({ where: { id } });
    if (!task || task.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.studyTask.update({
      where: { id },
      data: updates,
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.studyTask.findUnique({ where: { id } });
    if (!task || task.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.studyTask.delete({ where: { id } });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
