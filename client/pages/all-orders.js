import withData from "../lib/apollo";
import Layout from "../lib/Layout";
import AllOrders from "../components/AllOrders";

export default withData(props => {
  return (
    <Layout>
      <AllOrders />
    </Layout>
  );
});