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

briana = User.create(:first_name => "Briana",
            :last_name => "Estevez",
            :email => "bestevez416@gmail.com",
            :password => "test")

robin = User.create(:first_name => "Robin",
            :last_name => "Tong",
            :email => "rtong@gmail.com",
            :password => "test")

bryan = User.create(:first_name => "Bryan",
            :last_name => "Moles",
            :email => "bmoles@gmail.com",
            :password => "test")


5.times do
  brian.credited_expenses.create(:category => categories.sample,
                                 :name => names.sample,
                                 :total => rand_price)
end


roommates = Group.create(:name => "Roommates")

people = [brian, briana, robin, bryan]

# Form the group
people.each do |person|
  roommates.users << person
end


[briana, robin, bryan].each do |person| 
  Expense.all.each do |expense|
    expense.debtors << person
    expense.save!
  end
end



