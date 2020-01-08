  
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_REVIEWS = gql`
  {
    allReviews {
      id
      title
      review
    }
  }
`;

const Test = () => {
  const { loading, error, data, fetchMore } = useQuery(ALL_REVIEWS, {
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
      <>
      <h3>...loading</h3>
      </>
    )
  }
}

export default Test;