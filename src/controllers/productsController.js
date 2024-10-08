const {getData} = require('../data')
const products = getData("products.json")
const brands = getData("brands.json")

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
    },
    add : (req,res) => {
        const brandsOrdered = brands.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 0)
        return res.render('product-add',{
            brands : brandsOrdered
        })
    }
}