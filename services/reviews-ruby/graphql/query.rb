# frozen_string_literal: true

require 'graphql'
require_relative 'types/reviews'

# Review queries
class QueryType < GraphQL::Schema::Object
  description 'The query root of this review schema'

  field :reviews, [Types::Reviews], null: false do
    description 'Get all reviews for all products'
  end

  def reviews
    Reviews.all
  end
end
