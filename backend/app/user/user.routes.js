const router = require('express').Router();
const UserController = require('./user.controller');

// router.post('/', UserController.register);
router.post('/', UserController.login);

module.exports = router;