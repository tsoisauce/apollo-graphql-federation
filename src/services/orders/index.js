const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let orders = [
  {
    id: "order-1",
    purchasedBy: "customer-1"
  },
  {
    id: "order-2",
    purchasedBy: "customer-2"
  }
];

const typeDefs = gql`
  type Query {
    """
    Get information and test resolvers
    """
    infoOrders: String!
    """
    All customers is used to query all customers.
    """
    allOrders: [Order!]!
  }

  type Order {
    id: ID!
    purchasedBy: String!
  }
`;

const resolvers = {
  Query: {
    infoOrders: () => "This is a graph layer for orders information.",
    allOrders: () => orders
  },
  User: {
    __resolveReference(order, { fetchOrderById }) {
      return fetchOrderById(order.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(4002).then(({ url }) => {
  console.log(`💰‍ Orders Server ready at ${url}`);
});
