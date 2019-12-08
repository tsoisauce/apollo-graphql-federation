# frozen_string_literal: true

# create review tables in db
class CreateReviewsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :product_id
      t.integer :rating, limit: 8
      t.string :title
      t.text :review
      t.string :customer
      t.datetime :created_at
      t.datetime :updated_at
      t.timestamps
    end
    # indexes
    add_index :reviews, :product_id
    add_index :reviews, :customer
  end
end
