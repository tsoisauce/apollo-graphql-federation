const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
require('dotenv').config();

const gateway = new ApolloGateway({
  serviceList: [
    { name: "customers", url: "http://localhost:4001" },
    { name: "orders", url: "http://localhost:4002" },
    { name: "products", url: "http://localhost:4003" },
    { name: "reviews", url: "http://localhost:4004/graphql" }
  ]
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
  },
  persistedQueries: {},  // default in-memory cache
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway Server ready at ${url}`);
});
