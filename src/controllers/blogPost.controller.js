const blogPostService = require('../services/blogPost.service');

const insert = async (req, res) => {
  const { title, content, categoryIds, published, updated } = req.body;
  const { userId } = req.user;

  const { statusCode, result } = await blogPostService.insert({
    title, content, categoryIds, published, updated,
  }, userId);
  return res.status(statusCode).json(result);
};

const getAll = async (_req, res) => {
  const { statusCode, result } = await blogPostService.getAll();
  return res.status(statusCode).json(result);
};

const getAllByTerm = async (req, res) => {
  const { q } = req.query;

  const { statusCode, result } = await blogPostService.getAllByTerm(q);
  return res.status(statusCode).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { statusCode, result } = await blogPostService.getById(id);
  return res.status(statusCode).json(result);
};

const updateById = async (req, res) => {
  const { title, content, published, updated } = req.body;
  const { userId } = req.user;
  const { id } = req.params;

  let updateDate = updated;
  if (!updated) updateDate = new Date();

  const { statusCode, result } = await blogPostService.updateById(id, userId, {
    title, content, published, updated: updateDate,
  });
  return res.status(statusCode).json(result);
};

const deleteById = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const { statusCode } = await blogPostService.deleteById(id, userId);
  return res.status(statusCode).end();
};

module.exports = {
  insert,
  getAll,
  getAllByTerm,
  getById,
  updateById,
  deleteById,
};
