const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let products = [
  {
    id: "product-1",
    title: "Super Product",
    sku: "widget:1",
    price: 1200,
    inStock: true
  },
  {
    id: "product-2",
    title: "Awesome Thing",
    sku: "widget:2",
    price: 500,
    inStock: true
  },
  {
    id: "product-3",
    title: "Widget 3",
    sku: "widget:3",
    price: 2000,
    inStock: false
  }
];

const typeDefs = gql`
  type Query {
    """
    Get information and test resolvers.
    """
    infoProducts: String!
    """
    All customers is used to query all customers.
    """
    allProducts: [Product!]!
  },

  type Product @key(fields: "sku") {
    id: ID!
    title: String!
    sku: String!
    price: Int!
    inStock: Boolean!
  }
`;

const resolvers = {
  Query: {
    infoProducts: () => "This is a graph layer for product information.",
    allProducts: () => products
  },
  Product: {
    __resolveReference(reference) {
      return products.find(product => reference.sku === product.sku);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(4003).then(({ url }) => {
  console.log(`📊‍ Product Server ready at ${url}`);
});
