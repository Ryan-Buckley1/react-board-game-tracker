const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    favGames: [Game]
    favCount: String
    wishGames: [Game]
    wishCount: String
    ownGames: [Game]
    ownCount: String
    reviews: [Review]
    reviewCount: String
  }

  type Game {
    _id: ID!
    name: String!
    description: String!
    min_players: String!
    max_players: String!
    duration: String!
    age_rating: String!
    image_url: String!
    categories: [Category]
    categoryCount: String
    reviews: [Review]
    reviewCount: String
  }

  type Category {
    _id: ID!
    name: String!
  }

  type Review {
    _id: ID!
    author: String!
    reviewText: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input GameInput {
    name: String!
    description: String
    min_players: String
    max_players: String
    duration: String
    age_rating: String
    image_url: String
    categories: [Category]
  }

  type Query {
    currentUser: User
    user: User
    users: [User]
    game(name: String!): Game
    games: [Game]
    category(name: String!): Category
    categories: [Category]
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCategory(name: String!): Category
    removeCategory(name: String!): Category
  }
`;

module.exports = typeDefs;
