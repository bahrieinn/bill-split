################# GET ##################
before '/users/*' do
  require_login
end


get '/users/stats' do
  @user = User.find_by_id(session[:user_id])
  if request.xhr?
    { :total_credit => @user.total_credit, :total_debt => @user.total_debt}.to_json
  end
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

