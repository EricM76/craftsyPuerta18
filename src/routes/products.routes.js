const express = require('express');
const router = express.Router();
const {list,detail,add, create} = require('../controllers/productsController')

// /products
router
    .get('/',list) //-> listar todos los productos
    .get('/add',add) // -> muestra el formulario para agregar un producto
    .post('/add',create) // -> recibe la información que proviene del formulario
    
    .get('/:product_id',detail) //-> muestra el detalle de un producto




module.exports = router