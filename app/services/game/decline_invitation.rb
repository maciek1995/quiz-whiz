class Game::DeclineInvitation
  def initialize(game, current_user)
    @game = game
    @current_user = current_user
  end

  def call
    game.update(status: :aborted)
    GameBroadcastJob.perform_later(game.id, nil, nil, current_user)
    ActionCable.server.broadcast("user_invitation_#{current_user.id}", {game_id: game.id, deleted: true})
  end

  private

  attr_reader :game, :current_user
end
