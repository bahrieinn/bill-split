class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.belongs_to :creditor
      t.string :category
      t.decimal :total, :precision => 8, :scale => 2

      t.timestamps
    end
  end
end
