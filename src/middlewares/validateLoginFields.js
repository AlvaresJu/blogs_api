module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = { statusCode: 400, message: 'Some required fields are missing' };
    return next(err);
  }
  return next();
};
