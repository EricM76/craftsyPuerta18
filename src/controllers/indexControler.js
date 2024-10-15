const {getData} = require('../data')

module.exports = {
    index : (req,res) => {
        const products = getData("products.json")

        return res.render('home',{
            products : products.filter(product => product.id < 7)
        })
    },
    admin : (req,res) => {
        const products = getData("products.json")

        return res.render('admin',{
            products
        })
    }
}