class Game::PlayNow
  def initialize(current_user)
    @current_user = current_user
  end

  def call
    game = Game.find_by(status: :pending)
    if game
      UserGame.create(user: current_user, game: game)
      game.status = :ready
      game.save
    else
      game = Game.create(name: "Quick Game", status: :pending)
      UserGame.create(user: current_user, game: game)
    end

    return game
  end

  private

  attr_reader :current_user
end