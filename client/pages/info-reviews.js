import withData from "../lib/apollo";
import Layout from "../lib/Layout";
import InfoReviews from "../components/InfoReviews";

export default withData(props => {
  return (
    <Layout>
      <InfoReviews />
    </Layout>
  );
});