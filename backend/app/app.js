require("dotenv").config();
const express = require("express");
const dbConnect = require("../config/dbConnect");

dbConnect();
const app = express();

module.exports = app;
