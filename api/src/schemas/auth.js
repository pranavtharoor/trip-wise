import Joi from '@hapi/joi';

exports.signup = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })
});

exports.login = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })
});
