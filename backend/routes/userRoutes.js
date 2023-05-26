const express = require("express");
const {
  registerUserCtrl,
  loginUserCtrl,
  getUserProfile,
} = require("../controllers/usersCtrl");

const isLoggedIn = require("../middlewares/isLoggedIn");

const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", isLoggedIn, getUserProfile);

module.exports = userRoutes;
