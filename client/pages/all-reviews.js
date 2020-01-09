import withData from "../lib/apollo";
import Layout from "../lib/Layout";
import AllReviews from "../components/AllReviews";

export default withData(props => {
  return (
    <Layout>
      <AllReviews />
    </Layout>
  );
});