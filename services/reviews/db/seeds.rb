# frozen_string_literal: true

puts 'seeding database'

reviews_data = [
  {
    product_sku: 'widget:1',
    rating: 3,
    title: 'Amazing PRODUCT!!!!',
    review: 'Best one yet. A++ will buy again.',
    customer: 'johndoe@example.com'
  },
  {
    product_sku: 'widget:2',
    rating: 5,
    title: 'Cream helped fat husband',
    review: 'This diet cream help my husband lose weight, he was fat fuck now he not, fi star the end.',
    customer: 'JianYang@NewPiedPiper.com'
  }
]

reviews_data.each do |review|
  Reviews.create(review)
end
