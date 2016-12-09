class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.references :user, foreign_key: true
      t.references :game, foreign_key: true
      t.text :text

      t.timestamps
    end
  end
end
