const { User } = require("../models/User");
const CustomError = require("../utils/CustomError");

const isAdmin = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    const error = new CustomError(
      `User must be an admin to perform this function`,
      401
    );
    return next(error);
  }
  next();
};

module.exports = isAdmin;
