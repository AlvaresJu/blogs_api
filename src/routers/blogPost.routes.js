const express = require('express');

const blogPostController = require('../controllers/blogPost.controller');
const validateBlogPostFields = require('../middlewares/validateBlogPostFields');
const validateAuth = require('../middlewares/validateAuth');

const router = express.Router();

router.use(validateAuth);

router.post('/', validateBlogPostFields.toInsert, blogPostController.insert);
router.get('/', blogPostController.getAll);
router.get('/:id', blogPostController.getById);
router.put('/:id', validateBlogPostFields.toUpdate, blogPostController.updateById);
router.delete('/:id', blogPostController.deleteById);

module.exports = router;
