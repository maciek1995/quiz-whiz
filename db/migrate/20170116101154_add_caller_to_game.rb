class AddCallerToGame < ActiveRecord::Migration[5.0]
  def change
    add_reference :games, :caller, references: :users, index: true
    add_foreign_key :games, :users, column: :caller_id
  end
end
