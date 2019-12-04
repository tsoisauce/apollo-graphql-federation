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

1. Make sure you are using the latest Node LTS `nvm use`
2. Install Dependencies `yarn install`
3. Start Federated Services `yarn start-services`
4. Start Gateway (Data Graph) `yarn start-gateway`
