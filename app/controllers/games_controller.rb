class GamesController < ApplicationController

  def index

  end

  def play_now
    if @game = Game.first_pending
      UserGame.create(user: current_user, game: @game)
      @game.status = :ready
      @game.save
      redirect_to action: "current"
    else
      redirect_to action: "new"
    end
  end

  def new
    @game = Game.new
  end

  def current
    @game = current_user.current_game
    redirect_to action: "play_now" unless @game
    @message = Message.new
  end

  def show
  end
end
