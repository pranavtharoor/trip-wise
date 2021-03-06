import Joi from '@hapi/joi';

exports.flightsearch = Joi.object({
  body: Joi.object({
    tripid: Joi.number()
      .integer()
      .positive()
      .required(),
    source: Joi.string()
      .min(3)
      .max(3)
      .required(),
    destination: Joi.string()
      .min(3)
      .max(3)
      .required(),
    dateofdeparture: Joi.string()
      .regex(/^[0-9]{8}$/)
      .required(),
    seatingclass: Joi.string()
      .valid(['E', 'B'])
      .required(),
    people: Joi.array()
      .items(Joi.number().integer())
      .required()
  }).required()
});

exports.book = Joi.object({
  body: Joi.object({
    carrierid: Joi.string().required(),
    airline: Joi.string().required(),
    flightno: Joi.string().required(),
    totalfare: Joi.number().required()
  }).required()
});
