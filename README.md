# Apollo GraphQL Federation

Apollo GraphQL Federation demo.

```mermaid
graph TD
  A(Client)--request-->B(Data Graph Gateway)
  B-->C(Customers)
  C-->B
  B-->D(Orders)
  D-->B
  B--response-->A
```

## Installation

1. Install Dependencies `yarn install`
2. Start Federated Services `yarn start-services`
3. Start Gateway (Data Graph) `yarn start-gateway`
