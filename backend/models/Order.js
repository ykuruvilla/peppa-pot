const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

//
const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [{ type: Object, required: true }],
    shippingAddress: { type: Object, required: true },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["payment pending", "Paid"],
      default: "payment pending",
    },
    paymentMethod: { type: String, required: true, default: "not specified" },
    currency: { type: String, reuired: true, default: "not specified" },
    status: {
      type: String,
      required: "true",
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
    deliveredOn: { type: Date },
  },
  { timestamps: true }
);

OrderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = uuidv4();
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
