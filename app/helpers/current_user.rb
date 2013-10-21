def current_user
  @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
end

def require_login
  unless !current_user.nil? 
    redirect "/"
  end
end