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

module.exports = {
  login,
  insert,
};
