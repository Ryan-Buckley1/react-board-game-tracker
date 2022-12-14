const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cloudinary = require("cloudinary").v2;

const db = require("./config/connection");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleWare } = require("./utils/auth");
const PORT = process.env.PORT || 3001;

cloudinary.config({
  cloud_name: "dtcrmm1fs",
  api_key: "926534918754513",
  api_secret: process.env.API_SECRET,
  secure: true,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleWare,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
