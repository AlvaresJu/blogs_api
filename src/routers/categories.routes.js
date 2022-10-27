const express = require('express');

const categoryController = require('../controllers/category.controller');
const validateCategoryFields = require('../middlewares/validateCategoryFields');
const validateAuth = require('../middlewares/validateAuth');

const router = express.Router();

router.use(validateAuth);

router.post('/', validateCategoryFields, categoryController.insert);
router.get('/', categoryController.getAll);

module.exports = router;
