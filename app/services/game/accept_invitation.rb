class Game::AcceptInvitation
  def initialize(game)
    @game = game
  end

  def call
    game.update(status: :current, current_question_index: 0)
    return game
  end

  private

  attr_reader :game
end
