class AddCreditorNameToExpenses < ActiveRecord::Migration
  def change
    add_column :expenses, :creditor_name, :string
  end
end
