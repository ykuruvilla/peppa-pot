const express = require("express");
const {
  createNewBrand,
  getAllBrands,
  getBrandById,
} = require("../controllers/brandsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const brandRoutes = express.Router();

brandRoutes.post("/", isLoggedIn, createNewBrand);
brandRoutes.get("/", getAllBrands);
brandRoutes.get("/:id", getBrandById);

module.exports = brandRoutes;
