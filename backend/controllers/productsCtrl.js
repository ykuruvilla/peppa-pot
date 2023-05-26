const Product = require("../models/Product");
const findDocumentByField = require("../utils/mongo");
// @desc Create new product
// @route POST /api/v1/products
// @access Private/Admin
const createNewProduct = async (req, res) => {
  const { name, description, brand, category, user, price, totalQty } =
    req.body;
  const product = await findDocumentByField(Product, name);
  if (product) {
    throw new Error("product already exists");
  }

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
};

// @desc Get all products
// @route GET /api/v1/products
// @access Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { createNewProduct, getAllProducts };
