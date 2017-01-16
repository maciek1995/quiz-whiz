class Game < ApplicationRecord
  has_many :user_games
  has_many :users, through: :user_games

  belongs_to :caller, class_name: "User", optional: true

  has_many :game_questions
  has_many :questions, through: :game_questions

  enum status: [:pending, :finished, :pending_invitation, :aborted, :ready, :current]
end
