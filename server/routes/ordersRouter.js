const Router = require('express');
const ordersController = require('../controllers/ordersController');

const router = new Router();

router.post('/create', ordersController.createOrder);

module.exports = router;
