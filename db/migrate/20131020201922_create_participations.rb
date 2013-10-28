class CreateParticipations < ActiveRecord::Migration
  def change
    create_table :participations do |t|
      t.belongs_to :user
      t.belongs_to :expense
      t.decimal :amount_owed, :precision => 8, :scale => 2

      t.timestamps
    end
  end
end
