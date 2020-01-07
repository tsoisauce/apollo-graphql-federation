  
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const TEST = gql`{
    testField
  }
`;

const Test = () => {
  const { loading, error, data, fetchMore } = useQuery(TEST, {
    notifyOnNetworkStatusChange: true
  });
  
  if (data && data.testField) {
    const testMessage = data.testField
    return (
      <h1>{testMessage}</h1>
    )
  } else {
    return (
      <h1>...loading</h1>
    )
  }
}

export default Test;