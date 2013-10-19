######## CREATE NEW USER ##########
post '/users' do 
  @user = User.new(params[:user])
  
  if @user.save
    session[:user_id] = @user.id
    erb :profile
  else
    redirect "/"
  end
end

######## USER LOGIN ##########

post '/users/login' do
  @user = User.find_by_email(params[:email])

  if User.authenticate(params[:email], params[:password])
    session[:user_id] = @user.id
    erb :profile
  else
    redirect "/"
  end

end

