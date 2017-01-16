class AddGamesStatisticsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :games_played, :integer, default: 0
    add_column :users, :games_won, :integer, default: 0
    add_column :users, :games_drawn, :integer, default: 0
  end
end
