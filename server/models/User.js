const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    favGames: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    wishGames: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    ownGames: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("favCount").get(function () {
  return this.favGames.length;
});

userSchema.virtual("ownCount").get(function () {
  return this.ownGames.length;
});

userSchema.virtual("wishCount").get(function () {
  return this.wishGames.length;
});

userSchema.virtual("reviewCount").get(function () {
  return this.reviews.length;
});

const User = model("User", userSchema);

module.exports = User;
