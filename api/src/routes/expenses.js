import express from 'express';
import db from '../config/db';
import validate from '../utils/validator';
import schema from '../schemas/auth';

const http = require('http');

const router = express.Router();

router.get('/listExpenses', async (req, res) => {
  try {
    const result = await db.query(
      'select * from trips inner join expense on expense.tripid=trips.id where expense.added_by=?;',
      [req.user.id]
    );
    return res.sendSuccess(result);
  } catch (err) {
    res.sendError(err);
  }
});

router.post('/addExpense', async (req, res) => {
  try {
    let result = await db.query('insert into expense values(null,?,?,?,?)', [
      req.body.tripid,
      req.body.desc,
      req.body.amount,
      req.user.id
    ]);
    const count = result.insertId;
    console.log('Added to expense successfully!');
    req.body.owes.forEach(async user => {
      await db.query('insert into transactions values(null,?,?,?,?)', [
        req.body.tripid,
        count,
        user.userid,
        0 - user.amount
      ]);
    });
    req.body.paid.forEach(async user => {
      await db.query('insert into transactions values(null,?,?,?,?)', [
        req.body.tripid,
        count,
        user.userid,
        user.amount
      ]);
    });
    res.sendSuccess("Expenses and transactions added successfully!");
  } catch (e) {
    res.sendError(e);
  }
});

export default router;
