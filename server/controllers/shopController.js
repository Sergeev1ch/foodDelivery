const { Item } = require('../models/models');

class shopController {
  async getAll(req, res, next) {
    const items = await Item.findAll();
    return res.json(items);
  }

  async getShops(req, res, next) {
    const shops = await Item.findAll({ attributes: ['shop'], group: 'shop' });
    return res.json(shops);
  }

  async getAll(req, res, next) {
    const items = await Item.findAll();
    return res.json(items);
  }

  async getAllForShop(req, res, next) {
    const items = await Item.findAll({ where: { shop: req.params.shop } });
    return res.json(items);
  }
}

module.exports = new shopController();
