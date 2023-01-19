module.exports = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  if (!email || !password || !displayName) {
    const err = { statusCode: 400, message: 'Some required fields are missing' };
    return next(err);
  }
  return next();
};
