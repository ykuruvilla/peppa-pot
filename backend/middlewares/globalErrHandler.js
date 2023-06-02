const CustomError = require("../utils/CustomError");

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500),
      json({
        status: "error",
        message: "Something went wrong. Please try again later",
      });
  }
};
const globalErrHandler = (error, _req, res, _next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    prodErrors(res, error);
  }
};

// 404 handler
const notFound = (req, res, next) => {
  const err = new CustomError(`Route ${req.originalUrl} not found`, 404);
  next(err);
};

module.exports = { globalErrHandler, notFound };
