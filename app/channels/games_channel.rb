class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}"
  end

  def appear(data)
    ActionCable.server.broadcast(
        "game_#{data['game_id']}",
        ApplicationController.render(
            partial: 'games/game.json',
            locals: {current_user: current_user, game: Game.includes(:users,:questions).find(data['game_id'])})
    )
  end
end
