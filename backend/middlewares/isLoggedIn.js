const { User } = require("../models/User");
const CustomError = require("../utils/CustomError");
const { getTokenFromHeader, verifyToken } = require("../utils/authentication");
const isLoggedIn = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  const user = await User.findById(decodedUser.id).select("isAdmin");
  if (!decodedUser) {
    const error = new CustomError(
      "Invalid / Expired token. Please login again",
      401
    );
    return next(error);
  } else if (!user.isAdmin) {
    const error = new CustomError("User must have admin privileges", 401);
    return next(error);
  } else {
    req.user = user;
    req.userAuthId = decodedUser.id;
    next();
  }
};

module.exports = isLoggedIn;
