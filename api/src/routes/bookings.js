import express from 'express';

const router = express.Router();

router.get('/hey', (req, res) => {
  res.send('hello');
});

export default router;
