module Types
  class ReviewType < Types::BaseObject
    field :id, ID, null: false
    field :sku, String, null: false
    field :rating, Int, null: false
    field :title, String, null: false
    field :review, String, null: false
    field :customer, String, null: false
  end
end
