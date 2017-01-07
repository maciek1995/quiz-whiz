class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(game_id, question_id, score, current_user)
    ActionCable.server.broadcast(
        "game_#{game_id}",
        GamesController.render(
            partial: 'games/game.json',
            locals: {game: Game.find(game_id), answer: {question_id: question_id, score: score}, current_user: current_user}))
  end
end
