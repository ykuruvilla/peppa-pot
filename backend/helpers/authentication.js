const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePasswords = async (enteredPassword, hashedPassword) => {
  const passwordsMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return passwordsMatch;
};

module.exports = { hashPassword, comparePasswords };
