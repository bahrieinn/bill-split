class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.belongs_to :creditor
      t.string :category
      t.string :total

      t.timestamps
    end
  end
end
