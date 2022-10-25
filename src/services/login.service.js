const jwtUtil = require('../utils/jwt.util');

const { User } = require('../models');

const validateLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    const err = new Error('Invalid fields');
    err.statusCode = 400;
    throw err;
  }

  const token = jwtUtil.createToken({ userId: user.id, name: user.name });
  return { statusCode: 200, result: { token } };
};

module.exports = {
  validateLogin,
};
