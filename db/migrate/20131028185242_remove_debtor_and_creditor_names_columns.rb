class RemoveDebtorAndCreditorNamesColumns < ActiveRecord::Migration
  def change
    remove_column :expenses, :debtor_names
    remove_column :expenses, :creditor_name
  end
end
