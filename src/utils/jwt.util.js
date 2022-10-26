require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, process.env.JWT_SECRET, jwtConfig);

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (_e) {
    const err = new Error('Expired or invalid token');
    err.statusCode = 401;
    throw err;
  }
};

module.exports = {
  createToken,
  validateToken,
};
