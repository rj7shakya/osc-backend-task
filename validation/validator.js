const Joi = require("joi");

const updateSchema = Joi.object().keys({
  name: Joi.string().required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const signupSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

function validate(data, schema) {
  const result = schema.validate(data);
  let res = { data: data, error: {} };
  if (result.error) {
    res.error = result.error.details[0].message;
    return res;
  } else {
    return res;
  }
}

module.exports = { validate, updateSchema, loginSchema, signupSchema };
