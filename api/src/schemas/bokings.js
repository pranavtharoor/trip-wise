import Joi from '@hapi/joi';
import db from '../config/db';
let codes = [];
db.query('SELECT code from iata_codes')
  .then(response => {
    codes = response.map(el => el.code);
  })
  .catch(console.error);

exports.flightsearch = Joi.object({
  body: Joi.object({
    tripid: Joi.number()
      .integer()
      .positive()
      .required(),
    source: Joi.string()
      .valid(codes)
      .required(),
    destination: Joi.string()
      .valid(codes)
      .required(),
    dateofdeparture: Joi.string()
      .regex(/^[0-9]{8}$/)
      .required(),
    seatingclass: Joi.string()
      .valid(['E', 'S'])
      .required(),
    people: Joi.array()
      .items(Joi.string().email())
      .required()
  }).required()
});
