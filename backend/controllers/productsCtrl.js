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
const getProducts = asyncErrorHandler(async (req, res, next) => {
  let productQuery = Product.find();
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  const products = await productQuery;
  res.status(200).json({ status: "success", products });
});

module.exports = { createNewProduct, getProducts };
