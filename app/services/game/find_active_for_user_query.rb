class Game::FindActiveForUser
  def initialize(current_user)
    @current_user = current_user
  end

  def call
    return current_user.games.find_by(status: [:pending, :ready, :current])
  end

  private

  attr_reader :current_user
end
