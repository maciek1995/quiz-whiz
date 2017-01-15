class GamesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game, only: [:finish, :abort, :show, :accept_invitation, :decline_invitation]

  def play_now
    @game = Game::PlayNow.new(current_user).call

    redirect_to @game
  end

  def invite
    @game = Game::InviteUser.new(current_user, params[:user_id]).call

    redirect_to @game
  end

  def accept_invitation
    authorize @game
    @game = Game::AcceptInvitation.new(@game).call

    redirect_to @game
  end

  def decline_invitation
    authorize @game
    Game::DeclineInvitation.new(@game, current_user).call
  end

  def finish
    authorize @game
    Game::Finish.new(@game, current_user).call
  end

  def abort
    authorize @game
    Game::Abort.new(@game, current_user).call

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
