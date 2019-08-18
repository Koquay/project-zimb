const router = require('express').Router();
const OrderController = require('./order.controller');
const UserController = require('../user/user.controller');

router.post('/', OrderController.placeOrder);
router.get('/', UserController.authenticate, OrderController.getCurrentOrder);
router.post('/:id/:status', UserController.authenticate, OrderController.setOrderStatus);

module.exports = router;