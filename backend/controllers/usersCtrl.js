const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const {
  hashPassword,
  comparePasswords,
  generateToken,
  getTokenFromHeader,
  verifyToken,
} = require("../utils/authentication");
const findDocumentByField = require("../utils/mongo");

// @desc Register User
// @route POST /api/v1/users/register
// @access Private/Admin
const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const user = await findDocumentByField(User, email);
  if (user) {
    const error = new CustomError(
      `User with email ${email} already exists`,
      409
    );
    return next(error);
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: newUser,
  });
});

// @desc Login User
// @route POST /api/v1/users/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findDocumentByField(email);
  if (user) {
    const passwordsMatch = await comparePasswords(password, user.password);
    if (passwordsMatch) {
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        user,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid login details" });
    }
  }

  if (!user) {
    return res.status(401).json({ message: "Invalid login details" });
  }
  res.status(200).json({ message: "Found" });
};

// @desc Get user profile
// @route POST /api/v1/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  // const token = getTokenFromHeader(req);
  // if (!token) {
  //   return res.status(401).json({ message: "Missing JWT" });
  // }
  // const verifiedToken = verifyToken(token);
  // console.log(verifiedToken);

  res.status(200).json({ message: "Welcome to profile page" });
};

module.exports = { registerUser, loginUser, getUserProfile };
