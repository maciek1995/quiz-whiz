class Game::Finish
  def initialize(game, current_user)
    @game = game
    @current_user = current_user
  end

  def call
    game.update(status: :finished)
    first_user_games = game.user_games[0]
    second_user_games = game.user_games[1]
    if(first_user_games.score == second_user_games.score)
      game.user_games.each do |user_game|
        user_game.user.update(games_drawn: (user_game.user.games_drawn + 1))
      end
    else
      user_game = game.user_games.max_by { |user_games| user_games.score}
      user_game.user.update(games_won: (user_game.user.games_won + 1))
    end

    GameBroadcastJob.perform_later(game_id, nil, nil, current_user)
  end

  private

  attr_reader :game, :current_user
end