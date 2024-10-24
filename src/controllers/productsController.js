const {validationResult} = require('express-validator')
const { getData, storeData } = require("../data");
const brands = getData("brands.json");

module.exports = {
  list: (req, res) => {
    const products = getData("products.json");
    return res.render("products", {
      products,
    });
  },
  detail: (req, res) => {
    const products = getData("products.json");
    const { product_id } = req.params;
    const product = products.find((product) => product.id === +product_id);

    return res.render("product-detail", {
      ...product,
    });
  },
  add: (req, res) => {
    const brandsOrdered = brands.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : a.name.toLowerCase() < b.name.toLowerCase()
        ? -1
        : 0
    );
    return res.render("product-add", {
      brands: brandsOrdered,
    });
  },
  create: (req, res) => {
    const products = getData("products.json");    
    return res.send(validationResult(req))
    
    //validación precaria
    for (const key in req.body) {
      if (req.body[key].trim() == "") {
        return res.send("Todos los campos son requeridos");
      }
    }
    const { title, brand, description, price, discount, stock } = req.body;
    
    //guardar datos
    const newProduct = {
      id: +products[products.length - 1].id + 1,
      title: title.trim(),
      brand,
      price: +price,
      discount: +discount,
      description: description.trim(),
      stock: +stock,
      image: req.file.filename,
    };

    products.push(newProduct);

    storeData(products,'products.json')

    //respuesta al cliente
    return res.redirect(`/products/${newProduct.id}`)
  },
  search : (req,res) => {
    const products = getData("products.json");

    const {keywords} = req.query

    const result = products.filter(product => {
      return product.title.toLowerCase().includes(keywords.toLowerCase())
    })

    return res.render('products',{
      products : result,
      keywords
    })
  },
  edit: (req, res) => {
    const products = getData("products.json");
    const brandsOrdered = brands.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : a.name.toLowerCase() < b.name.toLowerCase()
        ? -1
        : 0
    );

    const {product_id} = req.params;

    const product = products.find(product => product.id === +product_id)

    return res.render("product-edit", {
      brands: brandsOrdered,
      ...product
    });
  },
  update : (req,res) => {
    const products = getData("products.json");

    const {product_id} = req.params
    const {title, price, stock, brand, description, discount} = req.body

    const productsModified = products.map(product => {
          if(product.id === +product_id){

              product = {
                ...product,
                title : title.trim(),
                price : price,
                stock : stock,
                brand : brand,
                description : description.trim(),
                discount : discount,
              }
          }
          return product
    })

    storeData(productsModified,'products.json');

    return res.render('products',{
      products : productsModified
    })
  },
  destroy : (req,res) => {
    const products = getData("products.json");
    const {product_id} = req.params

    const productsModified = products.filter(product => product.id !== +product_id);

    storeData(productsModified,'products.json');

    return res.render('products',{
      products : productsModified
    })
  }
};
