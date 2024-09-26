const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')


router.get('/',productsController.list) //-> listar todos los productos
router.get('/:product_id',productsController.detail) //-> muestra el detalle de un producto




module.exports = router