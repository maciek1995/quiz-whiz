class GamesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game, only: [:finish, :abort, :show, :accept_invitation]

  def play_now
    @game = Game::PlayNow.new(current_user).call

    redirect_to @game
  end

  def invite
    @game = Game::InviteUser.new(current_user, params[:user_id]).call

    redirect_to @game
  end

  def accept_invitation
    @game = Game::AcceptInvitation.new(@game).call

    redirect_to @game
  end

  def finish
    authorize @game
    Game::Finish.new(params[:id], current_user).call

    if @game.update(status: :finished)
      GameBroadcastJob.perform_later(params[:id], nil, nil, current_user)
    end
  end

  def abort
    authorize @game

    @game.update(status: :aborted)
    GameBroadcastJob.set(wait: 3.seconds).perform_later(params[:id].to_i, nil, nil, current_user)
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
