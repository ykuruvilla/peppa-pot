const CustomError = require("../utils/CustomError");

const globalErrHandler = (error, _req, res, _next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res
    .status(error.statusCode)
    .json({ status: error.status, message: error.message });
};

// 404 handler
const notFound = (req, res, next) => {
  const err = new CustomError(`Route ${req.originalUrl} not found`, 404);
  next(err);
};

module.exports = { globalErrHandler, notFound };
