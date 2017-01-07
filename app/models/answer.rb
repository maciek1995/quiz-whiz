class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :game_question

  after_create { GameBroadcastJob.perform_later(self.game_question.game.id) }
end
