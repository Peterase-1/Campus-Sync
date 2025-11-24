import express from 'express';
import {
  getNotes, createNote, deleteNote,
  getTasks, createTask, updateTask, deleteTask
} from '../controllers/studyController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

// Notes
router.get('/notes', getNotes);
router.post('/notes', createNote);
router.delete('/notes/:id', deleteNote);

// Tasks
router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
