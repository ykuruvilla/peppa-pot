const { User, findUserByEmail } = require("../models/User");
const {
  hashPassword,
  comparePasswords,
  generateToken,
  getTokenFromHeader,
  verifyToken,
} = require("../helpers/authentication");

// @desc Register User
// @route POST /api/v1/users/register
// @access Private/Admin
const registerUserCtrl = async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    return res
      .status(409)
      .json({ message: "User with that email already exists" });
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
};

// @desc Login User
// @route POST /api/v1/users/login
// @access Public
const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
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

module.exports = { registerUserCtrl, loginUserCtrl, getUserProfile };
