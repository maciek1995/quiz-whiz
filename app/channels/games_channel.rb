class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}"
  end

  def appear(data)
    GameBroadcastJob.perform_later(data['game_id'], nil, nil, nil)
  end
end
