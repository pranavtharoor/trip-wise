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

export default router;
