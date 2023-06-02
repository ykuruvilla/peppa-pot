const express = require("express");
const {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../controllers/categoriesCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");

const categoryRoutes = express.Router();

categoryRoutes.post("/", isLoggedIn, createNewCategory);
categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.delete("/:id", isLoggedIn, deleteCategoryById);
categoryRoutes.put("/:id", isLoggedIn, updateCategoryById);
module.exports = categoryRoutes;
