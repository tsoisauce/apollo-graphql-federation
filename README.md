# Apollo GraphQL Federation

Apollo GraphQL Federation demo.

## Federated Service Demo

This project is used to demo joing Graph layers from various languages and libraries.

```mermaid
graph TD
  Client(Client)--request-->Gateway(Data Graph Gateway - Node)
  Gateway-->Customers(Customers - Node)
  Customers-->Gateway
  Gateway-->Orders(Orders - Node)
  Orders-->Gateway
  Gateway-->Products(Products - Node)
  Products-->Gateway
  Gateway-->Reviews(Reviews - Ruby)
  Reviews-->Gateway
  Gateway--response-->Client
```

## Installation

1. Make sure you are using the latest Node LTS `nvm use`
2. Install Dependencies `yarn install`
3. Start Federated Services `yarn start-services`
4. Start Gateway (Data Graph) `yarn start-gateway`
5. Visit `http://localhost:4000` in browser to launch GraphQL Playground (Graphiql)

tip: if you need to kill any tcp ports `lsof -ti tcp:<PORT_NAME> | xargs kill`

## Queries and Mutations

### Example Queries

Refer to `DOCS` inside [Graphiql](http://localhost:4000) for more information on queries and muations.

`allOrders`: Retrieve all orders.

```graphql
query {
  allOrders {
    id
    financialStatus
    fulfillmentStatus
    customer {
      id
      firstName
      lastName
      email
    }
  }
}
```

`customerByEmail`: Retrieves customer information by email including all orders placed by customer.

```graphql
query {
  customerByEmail(email: "janedoe@example.com") {
    firstName
    lastName
    email
    orders {
      id
      financialStatus
      fulfillmentStatus
    }
  }
}
```

### Example Mutations

`deleteOrder`: Deletes one order.

```graphql
mutation {
  deleteOrder(id: "order-2") {
    id
    financialStatus
    fulfillmentStatus
    customer {
      id
      firstName
      lastName
      email
    }
  }
}
```

## Apollo Graph Manager

[Apollo Graph Manager](https://www.apollographql.com/docs/graph-manager/) (formerly Apollo Engine) is a cloud service that helps you manage, validate, and secure your organization's data graph.

```mermaid
graph LR
  A(Data Graph Gateway)-->B(Apollo Graph Manager)
  B-->A
```

### Publish Schema to Graph Manager

note: use `npx` if not installed globally

1. Run all services `yarn start-services` and gateway `yarn start-gateway`
2. Login or create an account [Apollo Data Graph Manager](https://engine.apollographql.com/login).
3. Update `ENGINE_API_KEY` in `.env` file.
4. Push schema to Data Graph Manager from root `apollo service:push --endpoint=http://localhost:4000`
5. Register each [federated services](https://www.apollographql.com/docs/graph-manager/federation/#registering-federated-services) `apollo service:push --serviceName="customers" --serviceURL="http://customers-graphql.svc.cluster.local:4001/" --endpoint="http://localhost:4001/"`
6. List all federated services: `apollo service:list`

TODO: connect to CI/CD process

## Built with

- [GraphQL](https://github.com/graphql)
- [Apollo Server](https://github.com/apollographql/apollo-server)
- [Apollo Federation](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-federation)
- [Apollo Graph Manager](https://www.apollographql.com/docs/graph-manager/)
