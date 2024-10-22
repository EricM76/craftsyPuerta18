const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')
const {list,detail,add, create, search, edit, update, destroy} = require('../controllers/productsController');
const productValidator = require('../validations/productValidator');

// /products
router
    .get('/',list) //-> listar todos los productos
    .get('/add',add) // -> muestra el formulario para agregar un producto
    .post('/add', upload.single('image'),productValidator, create) // -> recibe la información que proviene del formulario
    .get('/search',search)
    .get('/edit/:product_id',edit)
    .put('/update/:product_id',update)
    .delete('/destroy/:product_id',destroy)

    .get('/:product_id',detail) //-> muestra el detalle de un producto



module.exports = router