class Game < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :user_games
  has_many :users, through: :user_games

  enum status: [:pending, :finished, :aborted, :ready, :current]
end
