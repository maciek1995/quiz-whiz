class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :game_question

end
