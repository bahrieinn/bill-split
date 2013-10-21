get '/expenses' do
  if request.xhr?
    user = User.find(session[:user_id])
    expenses = user.credited_expenses
    expenses.to_json
  else
  end
end

post '/expenses' do
  if request.xhr?
    content_type :json

    user = User.find(session[:user_id])
    expense_attributes = JSON.parse(request.body.read)

    # If debtors is type String, then there is only one debtor
    if expense_attributes['debtors'].instance_of?(String)
      expense_attributes['debtors'] = [ User.find(expense_attributes['debtors'].to_i) ] 
    else
      debtor_ids = expense_attributes['debtors']
      debtors = debtor_ids.map { |debtor_id| User.find(debtor_id.to_i) }
      expense_attributes['debtors'] = debtors
    end
    expense = user.credited_expenses.new(expense_attributes)
    if expense.save!
      expense_attributes.to_json
    else
      "Expense NOT saved!"
    end
  end
end