const express = require("express");
const { createNewOrder } = require("../controllers/orderCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createNewOrder);

module.exports = orderRoutes;
