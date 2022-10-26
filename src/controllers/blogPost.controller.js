const blogPostService = require('../services/blogPost.service');

const insert = async (req, res) => {
  const { title, content, categoryIds, published, updated } = req.body;
  const { userId } = req.user;

  const { statusCode, result } = await blogPostService.insert({
    title, content, categoryIds, published, updated,
  }, userId);
  return res.status(statusCode).json(result);
};

module.exports = {
  insert,
};
