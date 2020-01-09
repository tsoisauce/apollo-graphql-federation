import withData from "../lib/apollo";
import Layout from "../lib/layout";
import Test from "../components/Test";

export default withData(props => {
  return (
    <Layout>
      <Test />
    </Layout>
  );
});