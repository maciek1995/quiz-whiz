class AddScoreToUserGames < ActiveRecord::Migration[5.0]
  def change
    add_column :user_games, :score, :integer, default: 0
  end
end
