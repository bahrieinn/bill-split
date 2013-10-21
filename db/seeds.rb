require 'faker'

categories = ["Utilities", "Rent", "Groceries"]
names = ["ComEd", "1600 S Indiana", "Comcast", "Trader Joes", "Costco"]


def rand_price
  num = rand(10..200).to_s
  return num + ".00"
end

brian = User.create(:first_name => "Brian",
            :last_name => "Tong",
            :email => "btong34@gmail.com",
            :password => "test")

5.times do
  brian.credited_expenses.create(:category => categories.sample,
                                 :name => names.sample,
                                 :total => rand_price)
end

