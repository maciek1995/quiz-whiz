class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}"
  end

  def unsubscribed
    Game.find(params[:game_id]).update(status: :aborted)
    GameBroadcastJob.perform_later(params[:game_id], nil, nil, current_user)
  end

  def appear(data)
    GameBroadcastJob.perform_later(data['game_id'], nil, nil, nil)
  end
end
