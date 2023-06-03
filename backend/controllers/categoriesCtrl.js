const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Category = require("../models/Category");
const CustomError = require("../utils/CustomError");

// @desc Create new category
// @route POST /api/v1/categories
// @access Private/Admin
const createNewCategory = asyncErrorHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.findOne({ name });
  if (category) {
    const error = new CustomError(
      `Category with name ${name} already exists`,
      409
    );
    return next(error);
  }
  const newCategory = await Category.create({ name, user: req.userAuthId });
  res.status(201).json({
    status: "Success",
    message: "Category successfully created",
    category: newCategory,
  });
});

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
const getAllCategories = asyncErrorHandler(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    categories,
  });
});

// @desc Get single category
// @route GET /api/v1/categories/id
// @access Public
const getCategoryById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    const error = new CustomError(`Category with id ${id} does not exist`, 409);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    category,
  });
});

// @desc Delete single category
// @route DELETE /api/v1/categories/id
// @access Private/Admin
const deleteCategoryById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    const error = new CustomError(`Category with id ${id} does not exist`, 409);
    return next(error);
  }
  res.status(204).send();
});

// @desc Update single category
// @route PUT /api/v1/categories/id
// @access Private/Admin
const updateCategoryById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  if (!updatedCategory) {
    const error = new CustomError(`Category with id ${id} does not exist`, 409);
    return next(error);
  }
  res.status(200).json({
    message: "Category successfully updated",
    status: "success",
    category: updatedCategory,
  });
});

module.exports = {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
