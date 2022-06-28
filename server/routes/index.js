const Router = require('express');
const shopRouter = require('./shopRouter');
const ordersRouter = require('./ordersRouter');

const router = new Router();

router.use('/items', shopRouter);
router.use('/orders', ordersRouter);

module.exports = router;
