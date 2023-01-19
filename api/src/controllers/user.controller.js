const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { statusCode, result } = await userService.login(email, password);
  return res.status(statusCode).json(result);
};

const insert = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { statusCode, result } = await userService.insert({ displayName, email, password, image });
  return res.status(statusCode).json(result);
};

const getAll = async (_req, res) => {
  const { statusCode, result } = await userService.getAll();
  return res.status(statusCode).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { statusCode, result } = await userService.getById(id);
  return res.status(statusCode).json(result);
};

const deleteById = async (req, res) => {
  const { userId } = req.user;

  const { statusCode } = await userService.deleteById(userId);
  return res.status(statusCode).end();
};

module.exports = {
  login,
  insert,
  getAll,
  getById,
  deleteById,
};
