const CustomError = require("../utils/CustomError");
const { getTokenFromHeader, verifyToken } = require("../utils/authentication");
const isLoggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new CustomError("Invalid / Expired token. Please login again", 401);
  } else {
    req.userAuthId = decodedUser?.id;
    next();
  }
};

module.exports = isLoggedIn;
