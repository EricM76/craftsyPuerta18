const { validationResult } = require("express-validator");
const { getData, storeData } = require("../data");
const {getOrderItems, getPagedItems} = require("../helpers");
const brands = getData("brands.json");

module.exports = {
  list: (req, res) => {
    const products = getData("products.json");
    const totalPages = Math.ceil(products.length / 12);
    const page = req.query.page || 1
    return res.render("products", {
      products: getPagedItems(products, page, 12),
      totalPages,
      page
    });
  },
  detail: (req, res) => {
    const products = getData("products.json");
    const { id } = req.params;
    const product = products.find((product) => product.id === +id);

    return res.render("product-detail", {
      ...product,
    });
  },
  add: (req, res) => {
    return res.render("product-add", {
      brands: getOrderItems(brands),
    });
  },
  create: (req, res) => {
    const products = getData("products.json");
    const errors = validationResult(req);

    if (errors.isEmpty()) {
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
        image: req.file
          ? req.file.filename
          : "http://dummyimage.com/200x300.png/cc0000/ffffff",
      };

      products.push(newProduct);

      storeData(products, "products.json");

      //respuesta al cliente
      return res.redirect(`/products/${newProduct.id}`);
    } else {
      return res.render("product-add", {
        brands: getOrderItems(brands),
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  search: (req, res) => {
    const products = getData("products.json");

    const { keywords } = req.query;

    const result = products.filter((product) => {
      return product.title.toLowerCase().includes(keywords.toLowerCase());
    });

    return res.render("products", {
      products: result,
      keywords,
    });
  },
  edit: (req, res) => {
    const products = getData("products.json");
    const { product_id } = req.params;

    const product = products.find((product) => product.id === +product_id);

    return res.render("product-edit", {
      brands: getOrderItems(brands),
      ...product,
    });
  },
  update: (req, res) => {
    const products = getData("products.json");

    const { product_id } = req.params;
    const { title, price, stock, brand, description, discount } = req.body;

    const productsModified = products.map((product) => {
      if (product.id === +product_id) {
        product = {
          ...product,
          title: title.trim(),
          price: price,
          stock: stock,
          brand: brand,
          description: description.trim(),
          discount: discount,
        };
      }
      return product;
    });

    storeData(productsModified, "products.json");

    return res.render("products", {
      products: productsModified,
    });
  },
  destroy: (req, res) => {
    const products = getData("products.json");
    const { product_id } = req.params;

    const productsModified = products.filter(
      (product) => product.id !== +product_id
    );

    storeData(productsModified, "products.json");

    return res.render("products", {
      products: productsModified,
    });
  },
};
