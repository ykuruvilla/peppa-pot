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
      unique: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "payment pending",
    },
    paymentMethod: { type: String, required: true, default: "not specified" },
    currency: { type: String, reuired: true, default: "not specified" },
    totalPrice: { type: Number, required: true, default: 0 },
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

OrderSchema.statics.updateProductQuantities = async function (orderItems) {
  const orderedProductIds = orderItems.map((item) => item._id);

  const orderedProducts = await this.model("Product").find({
    _id: { $in: orderedProductIds },
  });

  for (const orderedProduct of orderedProducts) {
    const orderedProductId = orderedProduct._id;

    const orderedItem = orderItems.find(
      (item) => item._id.toString() === orderedProductId.toString()
    );

    const orderedQuantity = orderedItem.totalBoughtQty;
    const newTotalQty = orderedProduct.totalQty - orderedQuantity;
    const newTotalSold = orderedProduct.totalSold + orderedQuantity;

    await this.model("Product").updateOne(
      { _id: orderedProductId },
      { totalQty: newTotalQty },
      { totalSold: newTotalSold }
    );
  }
};

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
