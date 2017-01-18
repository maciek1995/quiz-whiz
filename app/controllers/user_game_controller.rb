class UserGameController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user_game, only: [:update]

  def update
    @user_game.score += params[:score].to_i
    @user_game.last_answered = params[:question_index]
    game = @user_game.game
    if @user_game.save
      if game.user_games.where.not(id: @user_game.id).first.last_answered == game.current_question_index
        if game.current_question_index == game.questions.length - 1
          game.update(status: :finished)
          user_game_first = game.user_games.first
          user_game_second = game.user_games.second
          if user_game_first.score > user_game_second.score
            user_game_first.user.update(games_won: user_game_first.user.games_won + 1)
          elsif user_game_first.score < user_game_second.score
            user_game_second.user.update(games_won: user_game_second.user.games_won + 1)
          else
            user_game_first.user.update(games_drawn: user_game_first.user.games_drawn + 1)
            user_game_second.user.update(games_drawn: user_game_second.user.games_drawn + 1)
          end
        else
          game.update(current_question_index: game.current_question_index + 1)
        end
      end

      GameBroadcastJob.perform_later(params[:game_id].to_i, params[:question_index].to_i, params[:score].to_i, current_user)
    end
  end

  private

  def set_user_game
    @user_game = UserGame.find_by(user: current_user, game_id: params[:game_id])
  end
end
