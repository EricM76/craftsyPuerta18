module.exports = (req,res,next) =>{
    if(req.session.userLogin && req.session.userLogin.rol == "admin"){
        console.log('chequeado!!');
        
        return next()
    }else {
        return res.redirect('/')
    }
}