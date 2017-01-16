class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}"
  end

  def unsubscribed
    game = Game.find(params[:game_id])
    Game::Abort.new(game, current_user).call
  end

  def appear(data)
    GameBroadcastJob.perform_later(data['game_id'], nil, nil, nil)
  end
end
