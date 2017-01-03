class GameQuestion < ApplicationRecord
  belongs_to :game
  belongs_to :question
  has_many :answers
end
