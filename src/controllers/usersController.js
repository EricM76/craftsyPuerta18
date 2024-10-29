const path = require('path');
const { getData, storeData } = require("../data");

module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    login : (req,res) => {

        return res.render('login')
    },
    processLogin : (req,res) => {
        const users = getData('users.json');

        const {email, pass} = req.body;

        const user = users.find(user => user.email == email)
        
        if(user && user.pass == pass) {
            req.session.userLogin = {
                id : user.id,
                name : user.name,
                rol : user.rol
            }

            return res.redirect('/')
        }else {
            return res.render('login',{
                msg : "Credenciales inválidas"
            })
        }
              

    },
    profile : (req,res) => {
        return res.render('profile')
    },
    logout : (req,res) =>{
        req.session.destroy()
        return res.redirect('/')
    }
} 