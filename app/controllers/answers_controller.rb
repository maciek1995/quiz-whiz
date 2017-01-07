class AnswersController < ApplicationController
  before_action :authenticate_user!

  def create
    game_question_id = GameQuestion.find_by(game: current_user.games.find_by(status: [:pending, :ready, :current]), question_id: params[:question_id]).id
    current_user.answers.create!(answer_params.merge(game_question_id: game_question_id))

    render nothing: true
  end

  private

  def answer_params
    params.require(:answer).permit(:score)
  end
end
