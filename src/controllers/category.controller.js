const categoryService = require('../services/category.service');

const insert = async (req, res) => {
  const { name } = req.body;

  const { statusCode, result } = await categoryService.insert({ name });
  return res.status(statusCode).json(result);
};

const getAll = async (_req, res) => {
  const { statusCode, result } = await categoryService.getAll();
  return res.status(statusCode).json(result);
};

module.exports = {
  insert,
  getAll,
};
