const asyncErrorHandler = require("../middlewares/asyncErrHandler");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { User } = require("../models/User");
const CustomError = require("../utils/CustomError");
const formatOrdersForStripe = require("../utils/stripeFormatter");
const stripeKey = process.env.STRIPE_KEY;
const stripe = require("stripe")(stripeKey);

// @desc Create new order
// @route POST /api/v1/orders
// @access Private
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
    metadata: { orderId: JSON.stringify(newOrder._id) },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/success",
  });
  res.send({ url: session.url });
});

// @desc Get all orders
// @route GET /api/v1/orders
// @access Private
const getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.json({
    status: "success",
    message: "All orders successfully retrieved",
    orders,
  });
});

// @desc Get order by id
// @route GET /api/v1/orders/:orderId
// @access Private
const getOrderById = asyncErrorHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) {
    const error = new CustomError(`Order with id ${orderId} not found`, 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    message: "Order successfully retrieved",
    order,
  });
});

// @desc Update order by id
// @route GET /api/v1/orders/update/:orderId
// @access Private/Admin
const updateOrderById = asyncErrorHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    const error = new CustomError(`Order with id ${orderId} not found`, 404);
    return next(error);
  }
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Order successfully updated",
    updatedOrder,
  });
});

module.exports = {
  createNewOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
};
