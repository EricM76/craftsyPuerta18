const {getData} = require('../data')

module.exports = {
    index : (req,res) => {
        const products = getData("products.json")

        return res.render('home',{
            products
        })
    },
    admin : (req,res) => {
        const products = getData("products.json")

        return res.render('admin',{
            products
        })
    }
}