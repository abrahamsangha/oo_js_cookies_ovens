require 'bundler'
Bundler.require

set :redis, Redis.new

get '/' do
  send_file './public/index.html'
end

get '/oven-data' do
  response = settings.redis.get("myData")
  puts response
  if response
    response
  else
    []
  end
end

post '/update-redis' do
  jsonCookiesArray = request.body.read
  if settings.redis.set("myData",jsonCookiesArray)
    true
  else
    false
  end
end