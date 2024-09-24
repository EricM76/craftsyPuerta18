const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexControler')


router.get('/',indexController.index) //-> /
router.get('/admin',indexController.admin) // -> /admin



module.exports = router