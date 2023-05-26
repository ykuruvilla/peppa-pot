const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    isAdmin: { type: Boolean, default: false },
    hasShippingAddress: { type: Boolean, default: false },
    shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      province: { type: String },
      country: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error({ message: error });
  }
};

//compile the schema to model

module.exports = { User, findUserByEmail };
