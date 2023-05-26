const { getTokenFromHeader, verifyToken } = require("../utils/authentication");
const isLoggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new Error("Invalid / Expired token. Please login again");
  } else {
    req.userAuthId = decodedUser?.id;
    next();
  }
};

module.exports = isLoggedIn;
