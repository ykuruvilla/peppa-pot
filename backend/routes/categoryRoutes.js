const express = require("express");
const {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../controllers/categoriesCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

const categoryRoutes = express.Router();

categoryRoutes.post("/", isLoggedIn, isAdmin, createNewCategory);
categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.delete("/:id", isLoggedIn, isAdmin, deleteCategoryById);
categoryRoutes.put("/:id", isLoggedIn, isAdmin, updateCategoryById);
module.exports = categoryRoutes;
