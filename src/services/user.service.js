const { User } = require('../models');
const userValidation = require('./validations/user.validation');
const jwtUtil = require('../utils/jwt.util');

const getByEmail = async (email) => User.findOne({ where: { email } });

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

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { statusCode: 200, result: users };
};

const getById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    const err = new Error('User does not exist');
    err.statusCode = 404;
    throw err;
  }
  return { statusCode: 200, result: user };
};

const deleteById = async (userId) => {
  await User.destroy({ where: { id: userId } });
  return { statusCode: 204 };
};

module.exports = {
  login,
  insert,
  getAll,
  getById,
  deleteById,
};
