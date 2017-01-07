class Game::PlayNow
  def initialize(current_user)
    @current_user = current_user
  end

  def call
    game = Game.find_by(status: :pending)
    if game
      UserGame.create(user: current_user, game: game)
      game.status = :current
      game.save
    else
      game = Game.create(name: "Quick Game", status: :pending)
      UserGame.create(user: current_user, game: game)
      Question.all.sample(3).each do |question|
        GameQuestion.create(game: game, question: question)
      end
    end

    return game
  end

  private

  attr_reader :current_user
end
