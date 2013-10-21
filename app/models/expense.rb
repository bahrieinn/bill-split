class Expense < ActiveRecord::Base
  belongs_to :creditor, :class_name => "User"

  has_many :participations
  has_many :debtors, :through => :participations, :source => :user 

  before_save :add_creditor_name
  before_save :add_debtor_initials

  def add_creditor_name
    self.creditor_name = User.find(self.creditor_id).first_name
  end

  def add_debtor_initials
    self.debtor_names = self.debtors.map { |debtor| debtor.initials }.join(",")
  end

end
