const Router = require('express');

const router = new Router();
const shopController = require('../controllers/shopController');

router.get('/getAll', shopController.getAll);
router.get('/getAllForShop/:shop', shopController.getAllForShop);
router.get('/getShops', shopController.getShops);

module.exports = router;
