const { check } = require("express-validator");

module.exports = [
  check("title")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
    check("brand")
    .notEmpty()
    .withMessage("La marca es requerida"),
  check("stock")
    .isInt({
      min: 0,
    })
    .withMessage("Debe ser mayor a cero"),
    check("price")
    .isInt({
      min: 0,
    })
    .withMessage("Debe ser mayor a cero"),
    check("discount")
    .isInt({
      min: 0,
      max: 50
    })
    .withMessage("Debe entre 0 y 100%"),
    check("description").isLength({
        min: 20,
        max: 200
    })
    .withMessage("Entre 20 y 200 caracteres"),
];
