const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Brand = require("../models/Brand");
const CustomError = require("../utils/CustomError");

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

module.exports = { createNewBrand };
