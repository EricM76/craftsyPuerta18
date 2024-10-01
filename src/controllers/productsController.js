const {getData} = require('../data')
const products = getData("products.json")

module.exports = {
    list : (req,res) => {
        return res.render('products',{
            products
        })

    },
    detail : (req,res) => {
        const {product_id} = req.params
        const product = products.find(product => product.id === +product_id)
        
        return res.render('product-detail',{
            ...product
        })
    }
}