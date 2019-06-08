import express from 'express';
import axios from 'axios';
import validate from '../utils/validator';
import schema from '../schemas/bokings';
import db from '../config/db';
import config from '../config/goibibo';

const router = express.Router();
const flightSearchUrl = 'http://' + config.domain + '/api/search/';

router.post(
  '/flight/search',
  validate(schema.flightsearch),
  async (req, res) => {
    try {
      const query = {
        app_id: config.id,
        app_key: config.key,
        format: 'json',
        source: req.body.source,
        destination: req.body.destination,
        dateofdeparture: req.body.dateofdeparture,
        seatingclass: req.body.seatingclass,
        adults: 1 + req.body.people.length,
        children: 0,
        infants: 0,
        counter: 100
      };
      const flights = await axios.get(flightSearchUrl, {
        params: query
      });
      res.cookie('search_details', req.body);
      return res.sendSuccess(flights.data.data.onwardflights);
    } catch (err) {
      res.sendError(err);
    }
  }
);

router.get('/flight/airports', async (req, res) => {
  try {
    const result = await db.query('SELECT city,code FROM iata_codes');
    return res.sendSuccess(result);
  } catch (e) {
    res.sendError(e);
  }
});

router.post('/flight/book', validate(schema.book), async (req, res) => {
  try {
    if (!req.cookies.search_details)
      return res.sendError(null, 'Search session expired. Please search again');
    let insert = req.body;
    insert.depdate = req.cookies.search_details.dateofdeparture;
    insert.src = req.cookies.search_details.source;
    insert.dest = req.cookies.search_details.destination;
    insert.booked_by = req.user.id;
    insert.booked_for = JSON.stringify(req.cookies.search_details.people);
    insert.tripid = req.cookies.search_details.tripid;
    let result = await db.query('INSERT INTO flight_booking SET ?', [insert]);
    const booking_id = result.insertId;
    result = await db.query(
      'INSERT INTO expense(tripid, description, amount, added_by) VALUES (?,?,?,?)',
      [
        req.cookies.search_details.tripid,
        'Flight Booking FROM ' +
          insert.src +
          ' TO ' +
          insert.dest +
          ' ON ' +
          insert.depdate +
          ' #' +
          booking_id,
        req.body.totalfare,
        req.user.id
      ]
    );
    const expense_id = result.insertId;
    let per_person =
      parseFloat(req.body.totalfare) /
      (1 + req.cookies.search_details.people.length);
    let set = req.cookies.search_details.people.map(person => [
      req.cookies.search_details.tripid,
      expense_id,
      person,
      -1 * per_person
    ]);
    set.push([
      req.cookies.search_details.tripid,
      expense_id,
      req.user.id,
      req.cookies.search_details.people.length * per_person
    ]);
    console.log(set);
    await db.query(
      'INSERT INTO transactions(tripid,expenseid,userid,amount) VALUES ?',
      [set]
    );
    return res.sendSuccess(null, 'Ticket booked successfully');
  } catch (e) {
    res.sendError(e);
  }
});

export default router;
