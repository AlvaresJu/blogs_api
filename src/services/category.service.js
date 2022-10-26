const { Category } = require('../models');
const categoryValidation = require('./validations/category.validation');

const getByName = async (name) => Category.findOne({ where: { name } });

const insert = async (newCategory) => {
  const { name } = categoryValidation.validateCategoryData(newCategory);

  if (await getByName(name)) {
    const err = new Error('Category already registered');
    err.statusCode = 409;
    throw err;
  }

  const category = await Category.create({ name });
  return { statusCode: 201, result: category };
};

const getAll = async () => {
  const categories = await Category.findAll();
  return { statusCode: 200, result: categories };
};

module.exports = {
  insert,
  getAll,
};
