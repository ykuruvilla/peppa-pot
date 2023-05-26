const express = require("express");
const {
  createNewProduct,
  getProducts,
} = require("../controllers/productsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createNewProduct);
productRoutes.get("/", getProducts);

module.exports = productRoutes;
