const express = require("express");
const { createNewReview } = require("../controllers/reviewsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const reviewRoutes = express.Router();

reviewRoutes.post("/:productId", isLoggedIn, createNewReview);

module.exports = reviewRoutes;
