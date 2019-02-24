const express = require('express');
const router = express.Router();
const productsController = require('../src/controllers/productsController')

/* GET products listing. */
router.get('/', productsController.productsGetAll);
router.get('/search/:phrase', productsController.productSearch)
router.post('/addProduct', productsController.addProduct)


module.exports = router;
