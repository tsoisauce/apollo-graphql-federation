# frozen_string_literal: true

require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv/load'

# initalize activerecord DB connection
ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  host: (ENV['AWS_RDS_HOST']).to_s,
  username: (ENV['AWS_RDS_USERNAME']).to_s,
  password: (ENV['AWS_RDS_PASSWORD']).to_s,
  database: (ENV['AWS_RDS_DB']).to_s
)

# Graph layer for review service
class ReviewApp < Sinatra::Base
  get '/' do
    'It Works!'
  end
end

require './models'
