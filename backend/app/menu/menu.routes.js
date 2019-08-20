const router = require('express').Router();
const MenuController = require('./menu.controller');

router.get('/', MenuController.getMenu);
router.get('/:business', MenuController.getMenu);

module.exports = router;