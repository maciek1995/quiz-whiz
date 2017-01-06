class AddStatusToGame < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :status, :integer
  end
end
