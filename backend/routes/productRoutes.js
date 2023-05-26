const express = require("express");
const {
  createNewProduct,
  getProducts,
  getProductById,
} = require("../controllers/productsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createNewProduct);
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);

module.exports = productRoutes;
