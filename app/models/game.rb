class Game < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :user_games
  has_many :users, through: :user_games

  enum status: [:pending, :finished, :aborted, :ready, :started]


  def self.first_pending
    find_by(status: :pending)
  end

end
