const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    min_players: {
      type: String,
    },
    max_players: {
      type: String,
    },
    duration: {
      type: String,
    },
    age_rating: {
      type: String,
    },
    image_url: {
      type: String,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

gameSchema.virtual("reviewCount").get(function () {
  return this.reviews.length;
});

gameSchema.virtual("categoryCount").get(function () {
  return this.categories.length;
});
