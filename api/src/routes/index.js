import express from 'express';
import chat from './chat';
import expenses from './expenses';
import bookings from './bookings';

const router = express.Router();

router.use('/chat', chat);
router.use('/expenses', expenses);
router.use('/bookings', bookings);

export default router;
