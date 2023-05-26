const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Product = require("../models/Product");
const findDocumentByField = require("../utils/mongo");
// @desc Create new product
// @route POST /api/v1/products
// @access Private/Admin

const createNewProduct = asyncErrorHandler(async (req, res, next) => {
  const { name, description, brand, category, user, price, totalQty } =
    req.body;

  const newProduct = await Product.create({
    name,
    description,
    brand,
    category,
    user: req.userAuthId,
    price,
    totalQty,
  });

  //push the product into category
  res.status(201).json({ message: "Product created succesfully", newProduct });
});

// @desc Get all products
// @route GET /api/v1/products
// @access Public
const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ status: "success", products });
});

module.exports = { createNewProduct, getAllProducts };
