class UserGameController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user_game, only: [:update]

  def update
    @user_game.score += params[:score].to_i
    if @user_game.save
      GameBroadcastJob.perform_later(params[:game_id].to_i, params[:question_id].to_i, params[:score].to_i, current_user)
    end
  end

  private

  def set_user_game
    @user_game = UserGame.find_by(user: current_user, game_id: params[:game_id])
  end
end
