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
    info: String!
    """
    All customers is used to query all customers.
    """
    allCustomers: [Customer!]!
    """
    customerByEmail is used to query for customers by their email address.
    """
    customerByEmail(email: String!): [Customer!]!
  }

  """
  Customer is the person placing the order
  """
  type Customer @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "This is a graph layer for customer information.",
    allCustomers: () => customers,
    customerByEmail: (parent, args, context, info) => {
      return customers.filter(customer => {
        return customer.email === args.email;
      });
    }
  },
  User: {
    __resolveReference(user, { fetchUserById }) {
      return fetchUserById(user.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(4001).then(({ url }) => {
  console.log(`💁‍♀️ Customer Server ready at ${url}`);
});
