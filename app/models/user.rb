class User < ActiveRecord::Base
  belongs_to :group

  has_many :credited_expenses, :class_name => "Expense", :foreign_key => :creditor_id

  has_many :participations
  has_many :debited_expenses, :through => :participations, :source => :expense


  attr_reader :entered_password
  
  include BCrypt
  
  def password
    @password ||= Password.new(password_hash)
  end

  def password=(pass)
    @entered_password = pass
    @password = Password.create(pass)
    self.password_hash = @password
  end

  def self.authenticate(email, password)
    user = User.find_by_email(email)
    return user if user && (user.password == password)
    nil # either invalid email or wrong password
  end

  def initials
    first_name[0].upcase + last_name[0].upcase
  end

  def total_credit
    self.credited_expenses.pluck(:total).reduce(:+)
  end

  def total_debt
    self.debited_expenses.pluck(:total).reduce(:+)
  end

end
