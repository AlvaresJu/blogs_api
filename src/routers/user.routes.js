const express = require('express');

const userController = require('../controllers/user.controller');
const validateUserFields = require('../middlewares/validateUserFields');
const validateAuth = require('../middlewares/validateAuth');

const router = express.Router();

router.post('/', validateUserFields, userController.insert);

router.use(validateAuth);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

module.exports = router;
