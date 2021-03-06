import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_ORDERS = gql`
  {
    allOrders {
      id
      financialStatus
      fulfillmentStatus
      lineItems {
        sku
        inStock
        title
        price
      }
      customer {
        email
        firstName
        lastName
        avatar
      }
    }
  }
`;

const AllOrders = () => {
  const { loading, error, data, fetchMore } = useQuery(ALL_ORDERS, {
    notifyOnNetworkStatusChange: true
  });
  console.log(data)
  if (data && data.allOrders) {
    const orders = data.allOrders
    return (
    <>
      {orders.map(order => {
        const { id, financialStatus, fulfillmentStatus } = order
        const { email, firstName, lastName, avatar } = order.customer
        const { sku, inStock, title, price } = order.lineItems
        return (
          <div key={id} className="w-full lg:max-w-full lg:flex">
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z"/>
                  </svg>
                  Order
                </p>
                <div className="text-gray-900 font-mono font-normal text-sm mb-2">
                  <p className="font-bold text-lg">Status:</p>
                  <p>order ref: {id}</p>
                  <p>status: {financialStatus}</p>
                  <p>fulfillment: {fulfillmentStatus}</p>
                  <br />
                  <div>
                    <p className="font-bold text-lg">Product:</p>
                    <ul className="list-inside">
                      <li>title: {title}</li>
                      <li>sku: {sku}</li>
                      <li>stock: {inStock.toString()}</li>
                      <li>price: ${(price/100).toFixed(2)}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src={avatar} />
                <div className="text-sm">
                  <p className="text-base antialiased font-semibold text-gray-900 leading-none">{firstName} {lastName}</p>
                  <p className="text-sm text-gray-900 leading-none">{email}</p>
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
};

export default AllOrders;