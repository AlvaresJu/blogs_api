const express = require('express');

const blogPostController = require('../controllers/blogPost.controller');
const validateBlogPostFields = require('../middlewares/validateBlogPostFields');
const validateAuth = require('../middlewares/validateAuth');

const router = express.Router();

router.use(validateAuth);
router.post('/', validateBlogPostFields, blogPostController.insert);
router.get('/', blogPostController.getAll);
router.get('/:id', blogPostController.getById);

module.exports = router;
