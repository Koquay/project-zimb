const router = require('express').Router();
const MenuController = require('./menu.controller');

router.get('/', MenuController.getMenu);

module.exports = router;