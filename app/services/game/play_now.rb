class Game::PlayNow
  def initialize(current_user)
    @current_user = current_user
  end

  def call
    if(game = current_user.games.find_by(status: [:pending, :ready, :current]))
      return game
    end

    game = Game.find_by(status: :pending)
    if game
      UserGame.create(user: current_user, game: game)
      game.status = :current
      game.current_question_index = 0
      game.save
      game.users.each { |user| user.update(games_played: user.games_played + 1)  }
    else
      game = Game.create(name: "Quick Game", status: :pending)
      UserGame.create(user: current_user, game: game)

      Question.order("RANDOM()").limit(5).each do |question|
        GameQuestion.create(game: game, question: question)
      end
    end

    return game
  end

  private

  attr_reader :current_user
end
