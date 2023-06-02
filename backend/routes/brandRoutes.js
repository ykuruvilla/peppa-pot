const express = require("express");
const { createNewBrand } = require("../controllers/brandsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const brandRoutes = express.Router();

brandRoutes.post("/", isLoggedIn, createNewBrand);

module.exports = brandRoutes;
