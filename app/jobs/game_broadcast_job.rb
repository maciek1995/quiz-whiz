class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(game_id)
    ActionCable.server.broadcast(
        "game_#{game_id}",
        GamesController.render(
            partial: 'games/game.json',
            locals: {game: Game.includes(users: :answers).find(game_id)}))
  end
end
