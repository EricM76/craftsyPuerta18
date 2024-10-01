const {getData} = require('../data')
const products = getData("products.json")

module.exports = {
    index : (req,res) => {

        return res.render('home',{
            products
        })
    },
    admin : (req,res) => {

        return res.render('admin',{
            products
        })
    }
}