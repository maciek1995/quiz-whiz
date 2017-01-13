class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @game = Game::FindActiveForUser.new(current_user).call
    if @game
      redirect_to @game
    else
      @available_users = User::AvailableQuery.new.call
    end
  end
end
