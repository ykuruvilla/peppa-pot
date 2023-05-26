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
  const query = {};
  let productQuery = Product.find();
  if (req.query.name) {
    query.name = { $regex: req.query.name, $options: "i" };
  }
  if (req.query.brand) {
    query.brand = { $regex: req.query.brand, $options: "i" };
  }
  if (req.query.category) {
    query.category = { $regex: req.query.category, $options: "i" };
  }
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    query.price = { $gte: priceRange[0], $lte: priceRange[1] };
  }

  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const startIndex = (pageNumber - 1) * limit;

  const [products, totalDocuments] = await Promise.all([
    Product.find(query).skip(startIndex).limit(limit),
    Product.countDocuments(query),
  ]);

  const pagination = {};
  const endIndex = startIndex + products.length;
  if (endIndex < totalDocuments) {
    pagination.next = {
      pageNumber: pageNumber + 1,
      limit,
    };
    if (startIndex > 0) {
      pagination.prev = { pageNumber: pageNumber - 1, limit };
    }
  }
  res.status(200).json({
    status: "success",
    totalDocuments,
    documentsReturned: products.length,
    pagination,
    message: "Products succesfully fetched",
    products,
  });
});

module.exports = { createNewProduct, getProducts };
