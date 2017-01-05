class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    game = GamesController.render(partial: 'games/game.json', locals: {game: Game.includes(:users, :questions).find(game_id)})
    ActionCable.server.broadcast("game_#{game_id}", game: game)
  end
end
