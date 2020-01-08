  
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const INFO_REVIEWS = gql`
  {
    infoReviews
  }
`;

const Test = () => {
  const { loading, error, data, fetchMore } = useQuery(INFO_REVIEWS, {
    notifyOnNetworkStatusChange: true
  });
  
  if (data && data.infoReviews) {
    const reviewsMessage = data.infoReviews
    return (
    <>
      <h1>{reviewsMessage}</h1>
    </>
    )
  } else {
    return (
      <>
      <h3>...loading</h3>
      </>
    )
  }
}

export default Test;