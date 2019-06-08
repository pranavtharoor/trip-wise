import express from 'express';
import db from '../config/db';

const router = express.Router();

router.get('/:trip', async (req, res) => {
  try {
    const msgs = await db.query(
      'SELECT * FROM messages WHERE trip=? ORDER BY time ASC LIMIT 100',
      [req.params.trip]
    );
    return res.sendSuccess(msgs);
  } catch (err) {
    return res.sendError(err);
  }
});

export default router;
