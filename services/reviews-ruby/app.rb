# frozen_string_literal: true

require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/json'
require 'rack/contrib'
require 'dotenv/load'
require './models'

require_relative 'graphql/schema'

# initalize activerecord DB connection
ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  host: (ENV['AWS_RDS_HOST']).to_s,
  username: (ENV['AWS_RDS_USERNAME']).to_s,
  password: (ENV['AWS_RDS_PASSWORD']).to_s,
  database: (ENV['AWS_RDS_DB']).to_s
)

# Graph layer for review service
class ReviewsApp < Sinatra::Base
  use Rack::PostBodyContentTypeParser

  get '/' do
    'It Works!'
  end

  get '/hello.json' do
    message = { success: true, message: 'hello' }
    json message
  end

  # endpoint for reviews
  get '/reviews' do
    @reviews = Reviews.all
    json @reviews
  end

  # graphql endpoint
  post '/graphql' do
    result = ReviewsAppSchema.execute(
      params[:query],
      variables: params[:variables],
      context: { current_user: nil }
    )
    json result
  end
end
