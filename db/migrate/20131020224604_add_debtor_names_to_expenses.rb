class AddDebtorNamesToExpenses < ActiveRecord::Migration
  def change
    add_column :expenses, :debtor_names, :string
  end
end
