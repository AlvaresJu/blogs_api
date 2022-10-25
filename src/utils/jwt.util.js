require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, process.env.JWT_SECRET, jwtConfig);

module.exports = {
  createToken,
};
