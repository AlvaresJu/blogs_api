require('dotenv').config();
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const { BlogPost, Category, PostCategory } = require('../models');
const blogPostValidation = require('./validations/blogPost.validation');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

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

module.exports = {
  insert,
};
