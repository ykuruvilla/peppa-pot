const express = require("express");
const {
  createNewBrand,
  getAllBrands,
  getBrandById,
  deleteBrandById,
  updateBrandById,
} = require("../controllers/brandsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const brandRoutes = express.Router();

brandRoutes.post("/", isLoggedIn, createNewBrand);
brandRoutes.get("/", getAllBrands);
brandRoutes.get("/:id", getBrandById);
brandRoutes.delete("/:id", isLoggedIn, deleteBrandById);
brandRoutes.put("/:id", isLoggedIn, updateBrandById);

module.exports = brandRoutes;
