def user
  @user ||= User.find(params[:user_id]) || halt(404)
end