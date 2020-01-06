module Types
  module BaseInterface
    include GraphQL::Schema::Interface
    include ApolloFederation::Interface
    
    field_class Types::BaseField
  end
end
