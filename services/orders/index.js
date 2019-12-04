const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let orders = [
  {
    id: "order-1",
    financialStatus: "paid",
    fulfillmentStatus: "pending",
    customer: "janedoe@example.com"
  },
  {
    id: "order-2",
    financialStatus: "refunded",
    fulfillmentStatus: "fulfilled",
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
    Creates order for customer using the customer's email address.
    """
    createOrder(customer: String!): Order!
    """
    Deletes customer by order id
    """
    deleteOrder(id: ID!): [Order]
  }

  type Order {
    id: ID!
    financialStatus: String!
    fulfillmentStatus: String!
    customer: Customer!
  }

  extend type Customer @key(fields: "email") {
    email: String! @external
    orders: [Order]
  }
`;

const resolvers = {
  Query: {
    infoOrders: () => "This is a graph layer for orders information.",
    allOrders: () => orders
  },
  Mutation: {
    createOrder: (parent, args, context, info) => {
      const orderId = orders.length + 1;
      const order = {
        id: `order-${orderId}`,
        customer: args.customer
      };
      orders.push(order);
      return order;
    },
    deleteOrder: (parent, args, context, info) => {
      return orders.splice(
        orders.findIndex(item => item.id === args.id),
        1
      );
    }
  },
  Order: {
    customer(order) {
      return { __typename: "Customer", email: order.customer };
    }
  },
  Customer: {
    orders(customer) {
      return orders.filter(order => order.customer === customer.email);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(4002).then(({ url }) => {
  console.log(`💰‍ Orders Server ready at ${url}`);
});
