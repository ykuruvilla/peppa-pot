const { User, findUserByEmail } = require("../models/User");
const { hashPassword, comparePasswords } = require("../helpers/authentication");
const asyncHandler = require("express-async-handler");
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
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid login details" });
    }
  }

  if (!user) {
    return res.status(401).json({ message: "Invalid login details" });
  }
  res.status(200).json({ message: "Found" });
};

module.exports = { registerUserCtrl, loginUserCtrl };
