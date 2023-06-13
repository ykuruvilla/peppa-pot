const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is a required field"],
    },
    brand: { type: String, required: [true, "Brand is a required field"] },
    category: {
      type: String,
      ref: "Category",
      required: [true, "Category is a required field"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is a required field"],
      ref: "User",
    },
    images: [{ type: String, required: true }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    price: { type: Number, required: [true, "Price is a required field"] },
    totalQty: {
      type: Number,
      required: [true, "Total Qty is a required field"],
    },
    totalSold: {
      type: Number,
      required: [true, "Total Sold is a required field"],
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//Virtuals
//Average rating
ProductSchema.virtual("averageRating").get(function () {
  const totalReviews = this.reviews.length;
  const totalRating = this.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = totalRating / totalReviews;
  return averageRating;
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
