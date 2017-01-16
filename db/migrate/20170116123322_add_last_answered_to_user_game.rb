class AddLastAnsweredToUserGame < ActiveRecord::Migration[5.0]
  def change
    add_column :user_games, :last_answered, :integer
  end
end
