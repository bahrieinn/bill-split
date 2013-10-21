class Expense < ActiveRecord::Base
  belongs_to :creditor, :class_name => "User"

  has_many :participations
  has_many :debtors, :through => :participations, :source => :user 
end
