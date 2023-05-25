const User = require("../models/User");
const hashPassword = require("../helpers/authentication");

// @desc Register User
// @route POST /api/v1/users/register
// @access Private/Admin

const registerUserCtrl = async (req, res) => {
  const { fullName, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(409)
      .json({ message: "User with that email already exists" });
  }
  // hash password
  // create user
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ fullName, email, password: hashedPassword });
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: user,
  });
};

module.exports = registerUserCtrl;
