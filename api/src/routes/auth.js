import express from 'express';
import db from '../config/db';
import validate from '../utils/validator';
import schema from '../schemas/auth';

const router = express.Router();

router.post('/signup', validate(schema.signup), async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM users WHERE email = ?', [
      req.body.email
    ]);
    if (users.length > 0) return res.sendError(null, 'Email already exists');
    await db.query('INSERT INTO users(name,email,password) VALUES(?,?,?)', [
      req.body.name,
      req.body.email,
      req.body.password
    ]);
    res.sendSuccess(null, 'User created successfully');
  } catch (e) {
    res.sendError(e);
  }
});

router.post('/login', validate(schema.login), async (req, res) => {
  try {
    const user = await db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [req.body.email, req.body.password]
    );
    if (user.length == 0) return res.sendError(null, 'Wrong credentials');
    req.logIn(user[0], err => {
      if (err) return res.sendError(err);
      return res.sendSuccess(null, 'Login Successful');
    });
  } catch (e) {
    res.sendError(e);
  }
});

router.get('/search/:str', async (req, res) => {
  try {
    const temp = '%' + req.params.str + '%';
    const users = await db.query(
      'SELECT id,name,email from users where name like ? or email like ? order by name asc',
      [temp, temp]
    );
    return res.sendSuccess(users);
  } catch (err) {
    res.sendError(err);
  }
});

export default router;
