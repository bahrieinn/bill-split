get '/expenses' do
  if request.xhr?
    user = User.find(session[:user_id])
    expenses = user.credited_expenses + user.debited_expenses
    expenses.map do |expense|
      expense.as_json(:methods => [:creditor_name, :debtor_names])
    end.to_json
  else
  end
end

get '/expenses/:id' do
  if request.xhr?
    expense = Expense.find(params[:id])
    expense.to_json(:methods => [:creditor_name, :debtor_names])
  end
end

post '/expenses' do
  if request.xhr?
    content_type :json

    user = User.find(session[:user_id])
    expense_attributes = JSON.parse(request.body.read)
    debtor_data = expense_attributes.select { |k,v| k.match("debtor_") && !v.blank? }


    # Create expense through the user
    expense = user.credited_expenses.new(:name     => expense_attributes['name'],
                                         :category => expense_attributes['category'],
                                         :total    => expense_attributes['total'])


    if expense.save
      # Add debtors to the expense
      debtor_data.each do |id, amount|
        user_id = id.match(/\d+/).to_s.to_i
        participation = expense.participations.create(:user_id     => user_id,
                                                      :amount_owed => amount.to_f.round(2) )
      end    
      expense.save  
      expense_attributes.to_json
    else
      "Expense NOT saved!"
    end
  end
end

delete '/expenses/:id' do
  if request.xhr?
    expense = Expense.find(params[:id])
    expense.destroy
    expense.to_json
  end
end