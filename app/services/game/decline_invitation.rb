class Game::DeclineInvitation
  def initialize(current_user ,game)
    @game = game
    @current_user = current_user
  end

  def call
    game.update(status: :aborted)
    GameBroadcastJob.perform_later(game.id, nil, nil, current_user)
  end

  private

  attr_reader :game, :current_user
end
