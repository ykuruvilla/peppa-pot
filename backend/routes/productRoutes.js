const express = require("express");
const {
  createNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createNewProduct);
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id", isLoggedIn, updateProduct);
productRoutes.delete("/:id", isLoggedIn, deleteProduct);

module.exports = productRoutes;
