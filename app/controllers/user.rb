################# GET ##################
before '/users/*' do
  require_login
end

get '/users/:user_id' do
  @user = User.find_by_id(params[:user_id])
  if @user.nil?
    redirect "/"
  else
    erb :profile
  end
end





################### POST ################