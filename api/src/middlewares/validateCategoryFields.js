module.exports = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    const err = { statusCode: 400, message: '"name" is required' };
    return next(err);
  }
  return next();
};
