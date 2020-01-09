const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let customers = [
  {
    id: "customer-1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    avatar: "https://avatarfiles.alphacoders.com/203/thumb-203817.jpg"
  },
  {
    id: "customer-2",
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@example.com",
    avatar: "https://avatarfiles.alphacoders.com/944/thumb-94447.jpg"
  },
  {
    id: "customer-3",
    firstName: "Erlich",
    lastName: "Bachman",
    email: "erlichbachman@piedpiper.com",
    avatar: "https://gitlab.com/uploads/-/system/group/avatar/83169/erlich.jpeg"
  },
  {
    id: "customer-4",
    firstName: "Jian",
    lastName: "Yang",
    email: "jianyang@newpiedpiper.com",
    avatar: "http://siliconvalleyism.com/characters/jian-yang-small.jpg"
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
    """
    Creates customer
    """
    createCustomer(
      firstName: String!
      lastName: String!
      email: String!
      avatar: String!
    ): Customer
    """
    Deletes customer record by email
    """
    deleteCustomer(email: String!): [Customer]
  }

  type Customer @key(fields: "email") {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    avatar: String
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
      const customerId = customers.length + 1;
      const customer = {
        id: `customer-${customerId}`,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email
      };
      customers.push(customer);
      return customer;
    },
    deleteCustomer: (parent, args, context, info) => {
      return customers.splice(
        customers.findIndex(customer => customer.email === args.email),
        1
      );
    }
  },
  Customer: {
    __resolveReference(reference) {
      return customers.find(customer => reference.email === customer.email);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(4001).then(({ url }) => {
  console.log(`💁‍♀️ Customer Server ready at ${url}`);
});
