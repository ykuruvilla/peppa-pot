require("dotenv").config();
const express = require("express");
const dbConnect = require("../config/dbConnect");
const userRoutes = require("../routes/userRoutes");
const productRoutes = require("../routes/productRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const {
  globalErrHandler,
  notFound,
} = require("../middlewares/globalErrHandler");
const brandRoutes = require("../routes/brandRoutes");
const reviewRoutes = require("../routes/reviewRoutes");
const orderRoutes = require("../routes/orderRoutes");
const Order = require("../models/Order");
const stripeKey = process.env.STRIPE_KEY;
const stripe = require("stripe")(stripeKey);

dbConnect();
const app = express();

const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { orderId } = session.metadata;
      const {
        payment_status: paymentStatus,
        amount_total: totalAmount,
        currency,
      } = session;
      const paymentMethod = session.payment_method_types[0];

      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus,
        },
        { new: true }
      );
    } else {
      return;
    }
    // switch (event.type) {
    //   case "payment_intent.succeeded":
    //     const paymentIntentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.use(express.json());

//routes
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/categories/", categoryRoutes);
app.use("/api/v1/brands/", brandRoutes);
app.use("/api/v1/reviews/", reviewRoutes);
app.use("/api/v1/orders/", orderRoutes);

app.use(notFound);
app.use(globalErrHandler);

module.exports = app;
