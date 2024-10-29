const {getData} = require('../data')

module.exports = {
    index : (req,res) => {
        const products = getData("products.json")

        console.log(req.session.userLogin ? 'el usuario está logueado' : 'NO HAY NADIE!!!');
        
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