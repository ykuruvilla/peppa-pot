const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/usersCtrl");

const isLoggedIn = require("../middlewares/isLoggedIn");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", isLoggedIn, getUserProfile);

module.exports = userRoutes;
