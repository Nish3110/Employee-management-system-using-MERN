const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./GraphQL/typeDefs");
const resolvers = require("./GraphQL/resolvers");
const cors = require('cors');

async function startServer() {
  const app = express();
  const corsOptions = {
    origin: "*", // Change this to your frontend's URL if needed
    credentials: true, // Set this to true if you need to handle cookies or authentication headers
  };

  app.use(cors(corsOptions));

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });


  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  app.use(express.static(path.join(__dirname, 'bundle')));

  // console.log(path.resolve());
  app.use("/",(req, res) => {
    res.sendFile(path.join(__dirname + "/bundle/index.html"));
  });

  await mongoose.connect(
    "mongodb+srv://NBains:navdeep@cluster1.jyeth9l.mongodb.net/EMS?retryWrites=true&w=majority"
  );

  // mongoose.connection.on("connected", () => {
  console.log("Application is connected to database");
  // });

  app.listen(5000, () => {
    console.log("BackEnd Apollo server is running at port 3002");
  });
}

startServer();
