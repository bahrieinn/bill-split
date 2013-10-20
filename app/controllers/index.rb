get '/' do
  if current_user
    redirect "/users/#{session[:user_id]}"
  else
    erb :index
  end
end
