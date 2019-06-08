import express from 'express';
import chat from './chat';
import expenses from './expenses';
import bookings from './bookings';
import auth from './auth';
import trips from './trips';

const router = express.Router();

router.use('/trips', trips);
router.use('/auth', auth);
router.use('/chat', chat);
router.use('/expenses', expenses);
router.use('/bookings', bookings);

export default router;
