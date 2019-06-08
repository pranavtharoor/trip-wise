import express from 'express';
import db from '../config/db';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const result = await db.query(
      'INSERT INTO trips(name,creator) values(?,?)',
      [req.body.name, req.user.id]
    );
    const tripid = result.insertId;
    await db.query('INSERT INTO user_trip(userid, tripid) VALUES(?,?)', [
      req.user.id,
      tripid
    ]);
    res.sendSuccess({ tripid });
  } catch (err) {
    res.sendError(err);
  }
});

router.post('/addmembers', async (req, res) => {
  try {
    const set = req.body.users.map(el => [el, req.body.tripid]);
    console.log(set);
    await db.query('insert into user_trip(userid, tripid) values ?', [set]);
    return res.sendSuccess('Added successfully');
  } catch (err) {
    res.sendError(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'select tripid,name from trips inner join user_trip on trips.id=user_trip.tripid where userid = ?',
      [req.user.id]
    );
    return res.sendSuccess(result);
  } catch (err) {
    res.sendError(err);
  }
});

export default router;
