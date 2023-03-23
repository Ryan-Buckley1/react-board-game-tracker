const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { User, Game, Category, Review } = require("../models");

const resolvers = {
  Query: {
    currentUser: async (parent, args, context) => {
      try {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select("-__v -password")
            .populate("favGames wishGames ownGames reviews friends");

          return userData;
        }
        throw new AuthenticationError("You aren't logged in!");
      } catch (error) {
        return error;
      }
    },
    user: async (parent, { username }, context) => {
      try {
        if (context.user) {
          const userData = await User.findOne({ username: username }).select(
            "-__v -password"
          );
          if ((userData = null)) {
            return { error: "User does not exist" };
          } else {
            return userData;
          }
        }
        throw new AuthenticationError("You aren't logged in");
      } catch (error) {
        return error;
      }
    },
    users: async (parent, args, context) => {
      try {
        if (context.user) {
          const userData = await User.find().select("-__v -password");

          return userData;
        }
        throw new AuthenticationError("You aren't logged in");
      } catch (error) {
        return error;
      }
    },
    games: async (parent, args, context) => {
      try {
        const allGames = await Game.find().select("-__v");
        return allGames;
      } catch (error) {
        return error;
      }
    },
    game: async (parent, { name }, context) => {
      try {
        const singleGame = await Game.findOne({
          name: name,
        });
        if (singleGame === null) {
          return {
            error: "That game does not exist, would you like to create it?",
          };
        }
        return singleGame;
      } catch (error) {
        return error;
      }
    },
    category: async (parent, { name }, context) => {
      try {
        const singleCategory = await Game.find({ categories: name }).select(
          "-__v"
        );
        return singleCategory;
      } catch (error) {
        return error;
      }
    },
    categories: async (parent, args, context) => {
      try {
        const allCategories = await Category.find().select("-__v");
        return allCategories;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addCategory: async(parent),
  },
};
