const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let customers = [
  {
    id: "customer-1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com"
  },
  {
    id: "customer-2",
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@example.com"
  }
];

const typeDefs = gql`
  type Query {
    """
    Get information and test resolvers
    """
    infoCustomers: String!
    """
    All customers is used to query all customers.
    """
    allCustomers: [Customer!]!
    """
    customerByEmail is used to query for customers by their email address.
    """
    customerByEmail(email: String!): [Customer!]!
  }

  type Mutation {
    createCustomer(firstName: String!, lastName: String!, email: String!): Customer
  }

  type Customer @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
`;

const resolvers = {
  Query: {
    infoCustomers: () => "This is a graph layer for customer information.",
    allCustomers: () => customers,
    customerByEmail: (parent, args, context, info) => {
      return customers.filter(customer => {
        return customer.email === args.email;
      });
    }
  },
  Mutation: {
    createCustomer: (parent, args, context, info) => {
      const customerId = customers.length + 1
      const customer = {
        id: `customer-${customerId}`,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email
      }
      customers.push(customer)
      return customer
    }
  },
  Customer: {
    __resolveReference(reference) {
      return customers.find(customer => reference.id === customer.id)
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(4001).then(({ url }) => {
  console.log(`💁‍♀️ Customer Server ready at ${url}`);
});
