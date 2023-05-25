const express = require("express");
const { registerUserCtrl, loginUserCtrl } = require("../controllers/usersCtrl");

const userRoutes = express.Router();

userRoutes.post("/api/v1/users/register", registerUserCtrl);
userRoutes.post("/api/v1/users/login", loginUserCtrl);

module.exports = userRoutes;
