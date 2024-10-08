const { getData, storeData } = require("../data");
const products = getData("products.json");
const brands = getData("brands.json");

module.exports = {
  list: (req, res) => {
    return res.render("products", {
      products,
    });
  },
  detail: (req, res) => {
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
    console.log(req.body);

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
      image: "http://dummyimage.com/300x300.png/ff4444/ffffff",
    };

    products.push(newProduct);

    storeData(products,'products.json')

    //respuesta al cliente
    return res.redirect(`/products/${newProduct.id}`)
  },
};
