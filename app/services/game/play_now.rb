class Game::PlayNow
  def initialize(current_user)
    @current_user = current_user
  end

  def call
    if(game = current_user.games.find_by(status: [:pending, :ready, :current]))
      return game
    end

    game = Game.find_by(status: :pending)
    current_user.update(games_played: (current_user.games_played + 1))
    if game
      UserGame.create(user: current_user, game: game)
      game.status = :current
      game.save
    else
      game = Game.create(name: "Quick Game", status: :pending)
      UserGame.create(user: current_user, game: game)
      Question.all.order(:created_at).each do |question|
        GameQuestion.create(game: game, question: question)
      end
    end

    return game
  end

  private

  attr_reader :current_user
end
