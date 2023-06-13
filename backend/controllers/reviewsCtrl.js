const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Product = require("../models/Product");
const Review = require("../models/Review");
const CustomError = require("../utils/CustomError");

// @desc Create new review
// @route POST /api/v1/reviews
// @access Private/Admin
const createNewReview = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { rating } = req.body;
  const product = await Product.findById(productId).populate("reviews");
  if (!product) {
    const error = new CustomError(
      `Product with id ${productId} not found`,
      404
    );
    return next(error);
  }
  const hasReviewed = product.reviews.some(
    (review) => review.user.toString() === req.userAuthId
  );

  if (hasReviewed) {
    const error = new CustomError(
      `You have already reviewed this product`,
      401
    );
    return next(error);
  }
  const newReview = await Review.create({
    rating,
    user: req.userAuthId,
    product: product._id,
  });
  product.reviews.push(newReview._id);
  await product.save();
  res.status(201).json({
    status: "success",
    message: "Review created succesfully",
    review: newReview,
  });
});

module.exports = { createNewReview };
