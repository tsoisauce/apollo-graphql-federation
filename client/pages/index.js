import withData from "../lib/apollo";
import Layout from "../lib/Layout";
import Home from "../components/Home";

export default withData(props => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
});