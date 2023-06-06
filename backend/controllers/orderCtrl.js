const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Order = require("../models/Order");

const createNewOrder = asyncErrorHandler(async (req, res, next) => {});

module.exports = { createNewOrder };
