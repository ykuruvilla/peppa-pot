const express = require("express");
const { createNewBrand, getAllBrands } = require("../controllers/brandsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const brandRoutes = express.Router();

brandRoutes.post("/", isLoggedIn, createNewBrand);
brandRoutes.get("/", getAllBrands);

module.exports = brandRoutes;
