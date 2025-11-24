import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middleware/auth';

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const { archived } = req.query;
    const notes = await prisma.quickNote.findMany({
      where: {
        userId: req.user!.id,
        archived: archived === 'true',
      },
      orderBy: [{ pinned: 'desc' }, { updatedAt: 'desc' }],
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, tags, color } = req.body;
    const note = await prisma.quickNote.create({
      data: {
        userId: req.user!.id,
        title,
        content,
        tags: tags || [],
        color,
      },
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const note = await prisma.quickNote.findUnique({ where: { id } });
    if (!note || note.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const updatedNote = await prisma.quickNote.update({
      where: { id },
      data: updates,
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await prisma.quickNote.findUnique({ where: { id } });
    if (!note || note.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await prisma.quickNote.delete({ where: { id } });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
