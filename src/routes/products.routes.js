const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')


router.get('/',productsController.list) //-> /products
router.get('/:product_id',productsController.detail) //-> /products/:parametro




module.exports = router