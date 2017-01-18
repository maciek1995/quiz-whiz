class Game::Abort
  def initialize(game, current_user)
    @game = game
    @current_user = current_user
  end

  def call
    old_status = game.status
    game.update(status: :aborted)
    opponent = (game.users - [current_user]).first
    if old_status == "pending_invitation"
      ActionCable.server.broadcast("user_invitation_#{opponent.id}", {game_id: game.id, deleted: true})
    elsif  old_status == "current"
      opponent.update(games_won: opponent.games_won + 1)
    end
    GameBroadcastJob.set(wait: 2.seconds).perform_later(game.id, nil, nil, current_user)
  end

  private

  attr_reader :game, :current_user
end
