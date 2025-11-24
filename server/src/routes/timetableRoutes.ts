import express from 'express';
import { getClasses, createClass, updateClass, deleteClass, getAttendance, markAttendance } from '../controllers/timetableController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/', getClasses);
router.post('/', createClass);
router.patch('/:id', updateClass);
router.delete('/:id', deleteClass);
router.get('/:classId/attendance', getAttendance);
router.post('/attendance', markAttendance);

export default router;
