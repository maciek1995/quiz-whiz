class Game::AcceptInvitation
  def initialize(game)
    @game = game
  end

  def call
    game.update(status: :current, current_question_index: 0)
    game.users.each { |user| user.update(games_played: user.games_played + 1)  }
    return game
  end

  private

  attr_reader :game
end
