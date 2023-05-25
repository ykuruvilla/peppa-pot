require("dotenv").config();
const express = require("express");
const dbConnect = require("../config/dbConnect");
const userRoutes = require("../routes/userRoutes");

dbConnect();
const app = express();
app.use(express.json());

//routes

app.use("/", userRoutes);

module.exports = app;
