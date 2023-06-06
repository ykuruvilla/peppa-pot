const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { User } = require("../models/User");
const CustomError = require("../utils/CustomError");

const createNewOrder = asyncErrorHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  const user = await User.findById(req.userAuthId);

  if (orderItems?.length <= 0) {
    const error = new CustomError(
      "Your order must contain at least 1 item",
      400
    );
    return next(error);
  }
  const newOrder = await Order.create({
    user: user._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  await Order.updateProductQuantities(orderItems);
  user.orders.push(newOrder._id);
  user.hasShippingAddress = true;
  user.shippingAddress = shippingAddress;
  await user.save();
  console.log(user);

  res.status(200).json({
    status: "success",
    message: "Order created successfully",
    order: newOrder,
  });
});

module.exports = { createNewOrder };
