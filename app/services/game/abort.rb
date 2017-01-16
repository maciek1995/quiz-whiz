class Game::Abort
  def initialize(game, current_user)
    @game = game
    @current_user = current_user
  end

  def call
    pending_invitation = game.pending_invitation?
    game.update(status: :aborted)
    if pending_invitation
      opponent_id = (game.users - [current_user]).first.id
      ActionCable.server.broadcast("user_invitation_#{opponent_id}", {game_id: game.id, deleted: true})
    end
    GameBroadcastJob.set(wait: 2.seconds).perform_later(game.id, nil, nil, current_user)
  end

  private

  attr_reader :game, :current_user
end
