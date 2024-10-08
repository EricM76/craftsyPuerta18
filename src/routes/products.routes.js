const express = require('express');
const router = express.Router();
const {list,detail,add} = require('../controllers/productsController')

// /products
router
    .get('/',list) //-> listar todos los productos
    .get('/add',add) // -> muestra el formulario para agregar un producto
    .get('/:product_id',detail) //-> muestra el detalle de un producto



module.exports = router