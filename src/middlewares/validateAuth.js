const jwtUtil = require('../utils/jwt.util');

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const err = { statusCode: 401, message: 'Token not found' };
    return next(err);
  }
  const userData = jwtUtil.validateToken(authorization);
  req.user = userData;
  return next();
};
