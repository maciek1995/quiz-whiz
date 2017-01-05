class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages, dependent: :destroy
  has_many :user_games
  has_many :games, through: :user_games

  has_many :answers

  def appear(game_id)
    GameBroadcastJob.perform_later(game_id)
  end
end
