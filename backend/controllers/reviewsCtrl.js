const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Review = require("../models/Review");
const CustomError = require("../utils/CustomError");

// @desc Create new review
// @route POST /api/v1/reviews
// @access Private/Admin
const createNewReview = asyncErrorHandler(async (req, res, next) => {
  res
    .status(201)
    .json({ status: "success", message: "Review created succesfully", review });
});

module.exports = { createNewReview };
