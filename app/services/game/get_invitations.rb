class Game::GetInvitations
  def initialize(current_user)
    @current_user = current_user
  end

  def call
    current_user.games.where(status: :pending_invitation).map do |game|
      p game
      { game_id: game.id, user: (game.users - [current_user]).first }
    end
  end

  private

  attr_reader :current_user
end
