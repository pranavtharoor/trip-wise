import express from 'express';
import path from 'path';
import chat from './chat';
import expenses from './expenses';
import bookings from './bookings';
import auth from './auth';
import trips from './trips';
import songs from './songs';

const router = express.Router();
router.get('/playlist/', (req, res) => {
  if (req.query.id) {
    res.cookie('playid', req.query.id);
  }
  res.sendFile(path.join(__dirname, '..', 'playlist.html'));
});
router.use('/trips', trips);
router.use('/auth', auth);
router.use('/chat', chat);
router.use('/expenses', expenses);
router.use('/bookings', bookings);
router.use('/songs', songs);
router.get('/trips/:tripid/music', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'music.html'));
});

export default router;
