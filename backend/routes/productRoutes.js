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
const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, upload.array("files"), createNewProduct);
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id", isLoggedIn, updateProduct);
productRoutes.delete("/:id", isLoggedIn, deleteProduct);

module.exports = productRoutes;
