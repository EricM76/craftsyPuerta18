const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session')
const PORT = 3000;

const indexRoutes = require('./routes/index.routes');
const productsRoutes = require('./routes/products.routes');
const usersRoutes = require('./routes/users.routes');

const checkLocals = require('./middlewares/checklocals')

//configuración de los recursos estáticos
app.use(express.static(path.join(__dirname,'..', 'public')));

//configuración del motor de plantillas
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

//configuración para recibir datos de los formularios
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride('_method'));

app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
  }));

app.use(checkLocals)

app.use('/', indexRoutes);
app.use('/products',productsRoutes);
app.use('/users',usersRoutes);

app.listen(PORT, () => 'Servidor corriendo en http://localhost:' + PORT)