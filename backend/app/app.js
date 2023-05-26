require("dotenv").config();
const express = require("express");
const dbConnect = require("../config/dbConnect");
const userRoutes = require("../routes/userRoutes");
const {
  globalErrHandler,
  notFound,
} = require("../middlewares/globalErrHandler");
dbConnect();
const app = express();
app.use(express.json());

//routes

app.use("/api/v1/users/", userRoutes);

app.use(notFound);
app.use(globalErrHandler);

//err middleware

module.exports = app;
