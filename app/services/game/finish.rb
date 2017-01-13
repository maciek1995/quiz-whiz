class Game::Finish
  def initialize(game_id, current_user)
    @game_id = game_id
    @current_user = current_user
  end

  def call
    game = Game.find(game_id)
    game.update(status: :finished)
    first_user_games = game.user_games[0]
    second_user_games = game.user_games[1]
    if(first_user_games.score == second_user_games.score)
      game.user_games.each do |user_game|
        user_game.user.update(games_drawn: (user_game.user.games_drawn + 1))
      end
    elsif(first_user_games.score > second_user_games.score)
      first_user_games.user.update(games_won: (first_user_games.user.games_won + 1))
    else
      second_user_games.user.update(games_won: (second_user_games.user.games_won + 1))
    end

    GameBroadcastJob.perform_later(game_id, nil, nil, current_user)
  end

  private

  attr_reader :game_id, :current_user
end