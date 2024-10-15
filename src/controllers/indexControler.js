const {getData} = require('../data')
const products = getData("products.json")

module.exports = {
    index : (req,res) => {

        return res.render('home',{
            products : products.filter(product => product.id < 7)
        })
    },
    admin : (req,res) => {

        return res.render('admin',{
            products
        })
    }
}