import express from 'express';
import { createHabitController, deleteHabitController, editHabitController, getHabitsPerUser } from '../controller/habit.controller';
import { verifyJWT } from '../utils/jwt';

const router = express.Router();

router.post('/createHabit', verifyJWT, createHabitController);
router.put('/editHabit/:id', verifyJWT, editHabitController);
router.delete('/deleteHabit/:id', verifyJWT, deleteHabitController);
router.get('/:id', verifyJWT, getHabitsPerUser);

export default router;