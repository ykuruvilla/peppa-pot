require("dotenv").config();
const express = require("express");
const dbConnect = require("../config/dbConnect");
const userRoutes = require("../routes/userRoutes");
const productRoutes = require("../routes/productRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const {
  globalErrHandler,
  notFound,
} = require("../middlewares/globalErrHandler");

dbConnect();
const app = express();
app.use(express.json());

//routes

app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/categories/", categoryRoutes);
app.use(notFound);
app.use(globalErrHandler);

//err middleware

module.exports = app;
