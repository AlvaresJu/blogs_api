const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).max(255).required(),
  image: Joi.string().max(255),
});

const validateUserData = (newUser) => {
  const { error, value } = userSchema.validate(newUser);
  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
  return value;
};

module.exports = {
  validateUserData,
};
