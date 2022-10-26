const Joi = require('joi');

const categotySchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
});

const validateCategoryData = (newCategory) => {
  const { error, value } = categotySchema.validate(newCategory);
  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
  return value;
};

module.exports = {
  validateCategoryData,
};
