  
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_REVIEWS = gql`
  {
    allReviews {
      id
      title
      review
      rating
      customer
      avatar
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
      {reviews.map(product_review => {
        const { title, review, avatar, customer } = product_review
        return (
          <div key={review.id} className="max-w-sm w-full lg:max-w-full lg:flex">
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Reviews
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{review}</p>
              </div>
              <div className="flex items-center">
                <img class="w-10 h-10 rounded-full mr-4" src={avatar} />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">{customer}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
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