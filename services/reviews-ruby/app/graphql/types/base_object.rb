module Types
  class BaseObject < GraphQL::Schema::Object
    include ApolloFederation::Object

    field_class Types::BaseField
  end
end
