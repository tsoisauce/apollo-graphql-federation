# frozen_string_literal: true

require 'graphql'
require_relative 'query'

# Reviews schema
class ReviewsAppSchema < GraphQL::Schema
  query QueryType
end
