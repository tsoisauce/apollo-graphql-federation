# frozen_string_literal: true

require 'graphql'
require_relative 'base_object'

# Type Defs for reviews
class Types
  # Review Type Defs and Scalar
  class Reviews < Types::BaseObject
    description 'Reviews for products'

    field :id, ID, null: false
    field :product_sku, String, null: false
    field :rating, Int, null: true
    field :title, String, null: true
    field :review, String, null: true
    field :customer, String, null: true
  end
end
