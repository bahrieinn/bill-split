get '/expenses' do
  if request.xhr?
    user = User.find(session[:user_id])
    expenses = user.credited_expenses
    expenses.to_json
  else
  end
end