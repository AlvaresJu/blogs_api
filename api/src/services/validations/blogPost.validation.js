const Joi = require('joi');

const categoryIdSchema = Joi.number().integer().min(1);

const postSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  content: Joi.string().min(1).max(255).required(),
  categoryIds: Joi.array().min(1).items(categoryIdSchema).unique(),
  published: Joi.date(),
  updated: Joi.date(),
});

const validatePostData = (postData) => {
  const { error, value } = postSchema.validate(postData);
  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
  return value;
};

module.exports = {
  validatePostData,
};
