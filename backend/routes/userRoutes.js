const express = require("express");
const registerUserCtrl = require("../controllers/usersCtrl");

const userRoutes = express.Router();

userRoutes.post("/api/v1/users/register", registerUserCtrl);

module.exports = userRoutes;
