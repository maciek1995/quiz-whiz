class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @game = current_user.games.find_by(status: [:pending, :ready, :current])
    redirect_to @game if @game
  end
end
