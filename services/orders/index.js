const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let orders = [
  {
    id: "order-1",
    customer: "janedoe@example.com"
  },
  {
    id: "order-2",
    customer: "janedoe@example.com"
  }
];

const typeDefs = gql`
  type Query {
    """
    Get information and test resolvers.
    """
    infoOrders: String!
    """
    All customers is used to query all customers.
    """
    allOrders: [Order!]!
  }

  type Mutation {
    """
    Creates order for customer.
    """
    createOrder(customer: String!): Order!
  }

  type Order {
    id: ID!
    customer: Customer!
  }

  extend type Customer @key(fields: "email") {
    email: String! @external
  }
`;

const resolvers = {
  Query: {
    infoOrders: () => "This is a graph layer for orders information.",
    allOrders: () => orders,
  },
  Mutation: {
    createOrder: (parent, args, context, info) =>  {
      const orderId = orders.length + 1
      const order = {
        id: `order-${orderId}`,
        customer: args.customer
      }
      orders.push(order)
      return order
    }
  },
  Order: {
    customer(order) {
      return { __typename: "Customer", email: order.customer };
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(4002).then(({ url }) => {
  console.log(`💰‍ Orders Server ready at ${url}`);
});
