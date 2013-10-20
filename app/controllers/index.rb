get '/' do
  if current_user
    erb :profile
  else
    erb :index
  end
end
