# frozen_string_literal: true

require_relative './graphql_server'

REVIEWS = [
  {
    id: 'review-1',
    sku: 'widget:1',
    rating: 4,
    title: 'AMAZING PRODUCT!!!!',
    review: 'Best one yet. A++ will buy again.',
    customer: 'johndoe@example.com',
  },
  {
    id: 'review-2',
    sku: 'widget:2',
    rating: 5,
    title: 'Cream helped fat husband',
    review: 'This diet cream help my husband lose weight, he was fat fuck now he not, fi star the end.',
    customer: 'janedoe@example.com',
  },
].freeze

# Review TypeDef
class Review < BaseObject
  key fields: 'id'

  field :id, ID, null: false
  field :sku, 'Product', null: true
  field :rating, Int, null: false
  field :title, String, null: false
  field :review, String, null: false
  field :customer, String, null: false

  def customer
    { __typename: 'Customer', email: object[:customer] }
  end
end

class Customer < BaseObject
  key fields: 'email'
  extend_type

  field :email, String, null: false, external: true

  # resolver reference
  def reviews
    REVIEWS.select { |review| review[:email] == object[:email] }
  end
end

class Product < BaseObject
  key fields: 'sku'
  extend_type

  field :sku, String, null: false, external: true
  field :reviews, [Review], null: true

  def reviews
    REVIEWS.select { |review| review[:sku] == object[:sku] }
  end
end

class Query < BaseObject
  field :infoReviews, String, null: true
  field :allReviews, [Review], null: true

  def info_reviews
    'This is a Ruby graph layer for reviews information.'
  end

  def all_reviews
    REVIEWS
  end
end

class ReviewSchema < GraphQL::Schema
  include ApolloFederation::Schema

  orphan_types Customer, Review, Product
  query(Query)
end

GraphQLServer.run(ReviewSchema, Port: 4004)
