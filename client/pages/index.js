import withData from "../lib/apollo";
import Main from "../lib/layout";
import Test from "../components/Test";

export default withData(props => {
  return (
    <Main>
      <Test />
    </Main>
  );
});