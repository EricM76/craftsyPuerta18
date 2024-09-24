const path = require('path')

module.exports = {
    list : (req,res) => {
        return res.sendFile(path.join(__dirname,'..','views','products.html'))

    },
    detail : (req,res) => {

        console.log(req.params)
        return res.sendFile(path.join(__dirname,'..','views','product-detail.html'))

    }
}