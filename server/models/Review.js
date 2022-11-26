const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
