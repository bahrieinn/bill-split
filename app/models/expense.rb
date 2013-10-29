class Expense < ActiveRecord::Base
  belongs_to :creditor, :class_name => "User"

  has_many :participations
  has_many :debtors, :through => :participations, :source => :user 

  before_save :add_creditor_name

  def creditor_name
    creditor && creditor.first_name
  end

  def debtor_names
    @debtor_names ||= self.debtors.select([:first_name, :last_name]).map(&:initials)
  end
end
