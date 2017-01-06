class GamesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game, only: [:finish, :abort, :show]

  def play_now
    @game = current_user.games.find_by(status: [:pending, :ready, :current])
    @game ||= Game::PlayNow.new(current_user).call

    redirect_to @game
  end

  def finish
    authorize @game
    @game.update(status: :finished)

    redirect_to root_path
  end

  def abort
    authorize @game
    @game.update(status: :aborted)

    redirect_to root_path
  end

  def show
    authorize @game
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end
end
