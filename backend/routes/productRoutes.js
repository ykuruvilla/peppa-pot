const express = require("express");
const {
  createNewProduct,
  getAllProducts,
} = require("../controllers/productsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createNewProduct);
productRoutes.get("/", getAllProducts);

module.exports = productRoutes;
