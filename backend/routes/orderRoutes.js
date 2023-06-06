const express = require("express");
const {
  createNewOrder,
  getAllOrders,
  updateOrderById,
} = require("../controllers/orderCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createNewOrder);
orderRoutes.get("/", isLoggedIn, getAllOrders);
orderRoutes.get("/:orderId", isLoggedIn, getAllOrders);
orderRoutes.put("/update/:orderId", isLoggedIn, updateOrderById);

module.exports = orderRoutes;
