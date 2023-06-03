const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Brand = require("../models/Brand");
const CustomError = require("../utils/CustomError");

// @desc Create new brand
// @route POST /api/v1/brand
// @access Private/Admin
const createNewBrand = asyncErrorHandler(async (req, res, next) => {
  const { name } = req.body;
  const duplicateBrand = await Brand.findOne({ name });
  if (duplicateBrand) {
    const error = new CustomError(
      `Brand with name ${name} already exists`,
      409
    );
    return next(error);
  }

  const newBrand = await Brand.create({ name, user: req.userAuthId });
  res.status(201).json({
    status: "success",
    message: "Brand successfully created",
    brand: newBrand,
  });
});

// @desc Get all brands
// @route GET /api/v1/brands
// @access Public
const getAllBrands = asyncErrorHandler(async (req, res, next) => {
  const brands = await Brand.find();

  res.status(200).json({
    status: "success",
    message: "Brands fetched successfully",
    brands,
  });
});

// @desc Get single category
// @route GET /api/v1/categories/id
// @access Public
const getBrandById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    const error = new CustomError(`Brand with id ${id} does not exist`, 409);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    brand,
  });
});

module.exports = { createNewBrand, getAllBrands, getBrandById };
