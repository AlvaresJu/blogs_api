const { User } = require('../models');
const userValidation = require('./validations/user.validation');
const jwtUtil = require('../utils/jwt.util');

const getByEmail = async (email) => User.findOne({ where: { email } });

const insert = async (newUser) => {
  const { displayName, email, password, image } = userValidation.validateUserData(newUser);
  if (await getByEmail(email)) {
    const err = new Error('User already registered');
    err.statusCode = 409;
    throw err;
  }
  const { id } = await User.create({ displayName, email, password, image });
  const token = jwtUtil.createToken({ userId: id, userName: displayName });
  return { statusCode: 201, result: { token } };
};

const login = async (email, password) => {
  const user = await getByEmail(email);
  if (!user || user.password !== password) {
    const err = new Error('Invalid fields');
    err.statusCode = 400;
    throw err;
  }
  const token = jwtUtil.createToken({ userId: user.id, userName: user.displayName });
  return { statusCode: 200, result: { token } };
};

module.exports = {
  login,
  insert,
};
