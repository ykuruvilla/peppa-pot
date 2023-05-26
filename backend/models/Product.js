const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    image: { type: String, default: "https://via.placesholder.com/150" },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    price: { type: Number, required: true },
    totalQty: { type: Number, required: true },
    totalSold: { type: Number, required: true, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
