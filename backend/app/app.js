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
const brandRoutes = require("../routes/brandRoutes");

dbConnect();
const app = express();
app.use(express.json());

//routes

app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/categories/", categoryRoutes);
app.use("/api/v1/brands/", brandRoutes);
app.use(notFound);
app.use(globalErrHandler);

//err middleware

module.exports = app;
