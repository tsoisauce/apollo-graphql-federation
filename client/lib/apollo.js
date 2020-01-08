import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { withData } from "next-apollo";

// persisted query link GET for hashes and POST if doesn't exist
const link = createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
  createHttpLink({ uri: "http://localhost:4000" })
);

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: link,
});

export default withData(client);