class GamesController < ApplicationController

  def index

  end

  def play_now
    if game = Games.first_pending
      UserGame.create(user: current_user, game: game)
      game.satus = :ready
      game.save
    end
  end

  def current
    @game = Game.find(params[:id])
    @message = Message.new
  end

  def show
  end
end
