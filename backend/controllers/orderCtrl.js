const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { User } = require("../models/User");
const CustomError = require("../utils/CustomError");
const formatOrdersForStripe = require("../utils/stripeFormatter");
const stripeKey = process.env.STRIPE_KEY;
const stripe = require("stripe")(stripeKey);

const createNewOrder = asyncErrorHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  const user = await User.findById(req.userAuthId);

  if (!orderItems || orderItems.length === 0) {
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

  //convert order items to have stripe structure
  const stripeFormattedOrders = formatOrdersForStripe(orderItems);

  const session = await stripe.checkout.sessions.create({
    line_items: stripeFormattedOrders,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/success",
  });
  res.send({ url: session.url });

  // res.status(200).json({
  //   status: "success",
  //   message: "Order created successfully",
  //   order: newOrder,
  // });
});

module.exports = { createNewOrder };
