################# GET ##################
before '/users/*' do
  require_login
end

get '/users/:id' do
  erb :profile
end





################### POST ################