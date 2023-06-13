const express = require("express");
const {
  createNewBrand,
  getAllBrands,
  getBrandById,
  deleteBrandById,
  updateBrandById,
} = require("../controllers/brandsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

const brandRoutes = express.Router();

brandRoutes.post("/", isLoggedIn, isAdmin, createNewBrand);
brandRoutes.get("/", getAllBrands);
brandRoutes.get("/:id", getBrandById);
brandRoutes.delete("/:id", isLoggedIn, isAdmin, deleteBrandById);
brandRoutes.put("/:id", isLoggedIn, isAdmin, updateBrandById);

module.exports = brandRoutes;
