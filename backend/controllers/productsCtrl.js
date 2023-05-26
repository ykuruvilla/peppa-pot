const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Product = require("../models/Product");
const findDocumentByField = require("../utils/mongo");
const CustomError = require("../utils/CustomError");
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
  const limit = parseInt(req.query.limit) || 0;
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

// @desc Get single product
// @route GET /api/v1/products/:id
// @access Public
const getProductById = asyncErrorHandler(async (req, res, next) => {
  console.log("hi");
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    const error = new CustomError(`Product with id ${id} does not exist`, 404);
    return next(error);
  }
  res.status(200).json({ message: "Product fetched successfully", product });
});

// @desc update product
// @route PUT /api/v1/products/:id
// @access Private/Admin
const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, brand, category, user, price, totalQty } =
    req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      brand,
      category,
      user,
      price,
      totalQty,
    },
    { new: true }
  );

  if (!product) {
    const error = new CustomError(`Product with id ${id} does not exist`, 404);
    return next(error);
  }
  res.status(200).json({
    message: "Product sucessfully updated",
    status: "Success",
    product,
  });
});

const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    const error = new CustomError(`Product with id ${id} does not exist`, 404);
    return next(error);
  }

  res.status(204).send();
});

module.exports = {
  createNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
