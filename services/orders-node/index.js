const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let orders = [
  {
    id: "order-1",
    financialStatus: "paid",
    fulfillmentStatus: "processing",
    customer: "janedoe@example.com",
    lineItems: "widget:1"
  },
  {
    id: "order-2",
    financialStatus: "refunded",
    fulfillmentStatus: "fulfilled",
    customer: "johndoe@example.com",
    lineItems: "widget:2"
  },
  {
    id: "order-3",
    financialStatus: "refunded",
    fulfillmentStatus: "fulfilled",
    customer: "erlichbachman@piedpiper.com",
    lineItems: "widget:1"
  },
  {
    id: "order-4",
    financialStatus: "refunded",
    fulfillmentStatus: "fulfilled",
    customer: "jianyang@newpiedpiper.com",
    lineItems: "widget:2"
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
    lineItems: Product!
  }

  extend type Customer @key(fields: "email") {
    email: String! @external
    orders: [Order]
  }

  extend type Product @key(fields: "sku") {
    sku: String! @external
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
        financialStatus: "paid",
        fulfillmentStatus: "processing",
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
    },
    lineItems(order) {
      return { __typename: "Product", sku: order.lineItems}
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
