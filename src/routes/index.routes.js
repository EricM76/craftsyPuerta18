const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexControler')
const checkAdmin = require('../middlewares/checkAdmin')


router.get('/',indexController.index) //-> /
router.get('/admin',checkAdmin, indexController.admin) // -> /admin



module.exports = router