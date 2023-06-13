const express = require("express");
const {
  createNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require("../config/fileUpload");
const isAdmin = require("../middlewares/isAdmin");
const productRoutes = express.Router();

productRoutes.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.array("files"),
  createNewProduct
);
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id", isLoggedIn, isAdmin, updateProduct);
productRoutes.delete("/:id", isLoggedIn, isAdmin, deleteProduct);

module.exports = productRoutes;
