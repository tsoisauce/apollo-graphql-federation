module Types
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

  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :info_reviews, String, null: false,
      description: "An example field added by the generator"
    def info_reviews
      "This is a graph layer for customer information."
    end

    # all reviews query
    field :all_reviews, [Types::ReviewType], null: false,
      description: "Query for all reviews"
    def all_reviews
      REVIEWS
    end
  end
end
