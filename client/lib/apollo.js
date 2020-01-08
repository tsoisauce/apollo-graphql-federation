// import { withData } from "next-apollo";
// import { HttpLink } from "apollo-boost";

// const config = {
//   link: new HttpLink({
//     uri: "http://localhost:4000", // Server URL (must be absolute)
//     opts: {
//       credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
//     }
//   })
// };

// export default withData(config);

import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { withData } from "next-apollo";

// persisted query link GET for hashes and post if doesn't exist
const link = createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
  createHttpLink({ uri: "http://localhost:4000" })
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  // link: createHttpLink({ uri: "http://localhost:4000" })
});

export default withData(client);