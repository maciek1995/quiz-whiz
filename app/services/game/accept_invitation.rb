class Game::AcceptInvitation
  def initialize(game)
    @game = game
  end

  def call
    game.update(status: :current)
    return game
  end

  private

  attr_reader :game
end
