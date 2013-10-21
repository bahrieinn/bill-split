get '/group' do
  if request.xhr?
    user = User.find(session[:user_id])
    group_members = user.group.users.select { |member| member.id != user.id }
    group_members.to_json
  end
end