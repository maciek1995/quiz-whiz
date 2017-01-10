class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @game = Game::FindActiveForUser.new(current_user).call
    redirect_to @game if @game
  end
end
