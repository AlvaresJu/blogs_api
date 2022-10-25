const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { statusCode, result } = await loginService.validateLogin(email, password);
  return res.status(statusCode).json(result);
};

module.exports = {
  login,
};
