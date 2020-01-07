  
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const TEST = gql`
  {
    allReviews {
      id
      title
      review
      rating
      customer
    }
  }
`;

const Test = () => {
  const { loading, error, data, fetchMore } = useQuery(TEST, {
    notifyOnNetworkStatusChange: true
  });
  
  if (data && data.allReviews) {
    const reviews = data.allReviews
    return (
    <>
      <ul>
        {reviews.map(review => {
          return (
        <li key={review.id}>{review.title} - {review.review}</li>
          )
        })}
      </ul>
    </>
    )
  } else {
    return (
      <h1>...loading</h1>
    )
  }
}

export default Test;