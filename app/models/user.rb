class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_games
  has_many :games, through: :user_games
  has_many :answers

  def appear(game_id)
    ActionCable.server.broadcast(
        "game_#{game_id}",
        {
            game: ApplicationController.renderer.render(
                partial: 'games/game.json',
                locals: {game: Game.includes(:users,:questions).find(game_id)})
        }
    )
  end
end
