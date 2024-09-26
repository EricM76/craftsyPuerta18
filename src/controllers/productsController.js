const path = require('path')

module.exports = {
    list : (req,res) => {
        return res.render('products')

    },
    detail : (req,res) => {

        console.log(req.params)
        return res.render('product-detail')
    }
}