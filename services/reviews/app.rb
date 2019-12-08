# frozen_string_literal: true

require 'sinatra'
require 'sinatra/activerecord'

# Graph layer for review service
class ReviewApp < Sinatra::Base
  get '/' do
    'It Works!'
  end
end
