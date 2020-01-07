import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const config = {
  link: new HttpLink({
    uri: "http://localhost:4000", // Server URL (must be absolute)
    opts: {
      credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
    }
  })
};

export default withData(config);