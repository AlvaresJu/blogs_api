require('dotenv').config();
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const { BlogPost, Category, PostCategory, User } = require('../models');
const blogPostValidation = require('./validations/blogPost.validation');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const getIncludeConfig = { include: [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
] };

const checkCategories = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: { [Op.or]: categoryIds } },
  });
  return count === categoryIds.length;
};

const managedInsert = async (blogPostData, categoryIds) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create(blogPostData, { transaction: t });

      const listDataToInsert = categoryIds.map((categoryId) => ({
        postId: blogPost.id, categoryId,
      }));
      await PostCategory.bulkCreate(listDataToInsert, { transaction: t });

      return blogPost;
    });
    return { statusCode: 201, result };
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

const insert = async (postData, userId) => {
  const {
    title, content, categoryIds, published, updated, 
  } = blogPostValidation.validatePostData(postData);

  if (!await checkCategories(categoryIds)) {
    const err = new Error('one or more "categoryIds" not found');
    err.statusCode = 400;
    throw err;
  }
  return managedInsert({ title, content, published, updated, userId }, categoryIds);
};

const getAll = async () => {
  const posts = await BlogPost.findAll(getIncludeConfig);
  return { statusCode: 200, result: posts };
};

const getById = async (postId) => {
  const post = await BlogPost.findByPk(postId, getIncludeConfig);
  if (!post) {
    const err = new Error('Post does not exist');
    err.statusCode = 404;
    throw err;
  }
  return { statusCode: 200, result: post };
};

const update = async (postId, userId, dataToUpdate) => {
  const { title, content, published, updated } = blogPostValidation.validatePostData(dataToUpdate);

  const { result } = await getById(postId);
  if (result.userId !== userId) {
    const err = new Error('Unauthorized user');
    err.statusCode = 401;
    throw err;
  }

  await BlogPost.update(
    { title, content, published, updated },
    { where: { id: postId } },
  );
  return getById(postId);
};

module.exports = {
  insert,
  getAll,
  getById,
  update,
};
