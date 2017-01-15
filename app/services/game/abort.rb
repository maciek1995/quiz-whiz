class Game::Abort
  def initialize(game, current_user)
    @game = game
    @current_user = current_user
  end

  def call
    game.update(status: :aborted)
    GameBroadcastJob.set(wait: 2.seconds).perform_later(game.id, nil, nil, current_user)
  end

  private

  attr_reader :game
end