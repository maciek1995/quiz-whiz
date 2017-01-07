class AnswersController < ApplicationController
  before_action :authenticate_user!

  def create
    current_user.answers.create(answer_params)
  end

  private

  def answer_params
    params.require(:answer).permit(:score, :game_question_id)
  end
end
