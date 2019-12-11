# frozen_string_literal: true

require 'graphql'
require_relative 'types/reviews'

# static sample data not using active record
def data
  [
    { id: 'review-1', product_sku: 'widget:1', rating: 4, title: 'test review', review: 'A++ will do again', customer: 'johndoe@email.com' },
    { id: 'review-2', product_sku: 'widget:2', rating: 5, title: 'could be better', review: 'didnt like it much', customer: 'janedoe@email.com' },
    { id: 'review-3', product_sku: 'widget:3', rating: 3, title: 'test', review: 'what is this', customer: 'johndoe@email.com' }
  ]
end

# Review queries
class QueryType < GraphQL::Schema::Object
  description 'The query root of this review schema'

  field :reviews, [Types::Reviews], null: false do
    description 'Get all reviews for all products'
  end

  def reviews
    # Reviews.all
    data
  end
end
