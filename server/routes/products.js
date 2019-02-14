const express = require('express');
const router = express.Router();
const productsController = require('../src/controllers/productsController')

/* GET products listing. */
router.get('/', productsController.productsGetAll);

module.exports = router;
