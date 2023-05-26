const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePasswords = async (enteredPassword, hashedPassword) => {
  const passwordsMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return passwordsMatch;
};

const jwtKey = process.env.JWT_KEY;
const generateToken = (id) => {
  return jwt.sign({ id }, jwtKey, { expiresIn: "3d" });
};

const getTokenFromHeader = (req) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtKey, (err, decodedToken) => {
    if (err) {
      return false;
    } else {
      return decodedToken;
    }
  });
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  getTokenFromHeader,
  verifyToken,
};
