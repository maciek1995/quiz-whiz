class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}"
  end

  def appear(data)
    mock_env = Rack::MockRequest.env_for('/')
    catch(:env) do
      Rails.application.middleware.build(->(env) {
        throw :env, env
      }).call mock_env
    end
    ActionCable.server.broadcast(
        "game_#{data['game_id']}",
        {
            game: ApplicationController.render(
                partial: 'games/game.json',
                locals: {game: Game.includes(:users,:questions).find(data['game_id'])})
        }
    )
  end
end