const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "customers", url: "http://localhost:4001" },
    { name: "orders", url: "http://localhost:4002" }
  ]
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway Server ready at ${url}`);
});
