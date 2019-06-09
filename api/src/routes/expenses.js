import express from 'express';
import db from '../config/db';
import validate from '../utils/validator';
import schema from '../schemas/auth';

const http = require('http');
let {PythonShell} = require('python-shell');


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

router.get('/parseBill', async (req, res) => {
  try {
    // const {spawn} = require('child_process');
    // const pyProcess = spawn('python', ['../../parser2.py']);
    // // console.log("Inside parseBill");
    // await pyProcess.stdout.on('data', data => {
    //   console.log('In parse');
    //   console.log(data);
    //   res.send(data);
    // });
    // console.log("inside ParseBill");
    // console.log()
    PythonShell.run('parser2.py', {scriptPath: '/home/dylan/Desktop/projects/mmtb/base/trippee/api/'}, (err,result) => {
      if(err)
        throw err;
      res.send(result);
    });
  } catch (e) {
    res.sendError(e);
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
    res.sendSuccess('Expenses and transactions added successfully!');
  } catch (e) {
    res.sendError(e);
  }
});

export default router;
