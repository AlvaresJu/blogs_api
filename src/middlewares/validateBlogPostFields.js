const toInsert = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    const err = { statusCode: 400, message: 'Some required fields are missing' };
    return next(err);
  }
  return next();
};

const toUpdate = (req, _res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    const err = { statusCode: 400, message: 'Some required fields are missing' };
    return next(err);
  }
  return next();
};

module.exports = {
  toInsert,
  toUpdate,
};
