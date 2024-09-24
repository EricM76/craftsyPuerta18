const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const indexRoutes = require('./routes/index.routes');
const productsRoutes = require('./routes/products.routes')

app.use(express.static(path.join(__dirname,'..', 'public')));


app.use('/', indexRoutes);
app.use('/products',productsRoutes)



app.get('/products-detail', (req,res) => res.sendFile(path.join(__dirname,'views','product-detail.html')))
app.get('/register', (req,res) => res.sendFile(path.join(__dirname,'views','register.html')))
app.get('/login', (req,res) => res.sendFile(path.join(__dirname,'views','login.html')))
app.get('/profile', (req,res) => res.sendFile(path.join(__dirname,'views','profile.html')))
app.get('/products', (req,res) => res.sendFile(path.join(__dirname,'views','products.html')))



app.listen(PORT, () => 'Servidor corriendo en http://localhost:' + PORT)