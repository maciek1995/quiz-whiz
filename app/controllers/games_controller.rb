class GamesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game, only: [:finish, :abort, :show]

  def play_now
    @game = Game::PlayNow.new(current_user).call

    redirect_to @game
  end

  def invite
    if opponent = User.find(params[:user_id])
      @game = Game.create(status: :pending_invitation, name: "Custom Game")
      current_user.user_games.create(game: @game)
      opponent.user_games.create(game: @game)
      # TODO: random questions
      Question.all.order(:created_at).each do |question|
        GameQuestion.create(game: @game, question: question)
      end

      ActionCable.server.broadcast("user_invitation_#{opponent.id}", "gowno")

      redirect_to @game
    end
  end

  def finish
    authorize @game
    Game::Finish.new(params[:id], current_user).call

    if @game.update(status: :finished)
      GameBroadcastJob.perform_later(params[:id], nil, nil, current_user)
    end
  end

  def abort
    authorize @game

    @game.update(status: :aborted)
    GameBroadcastJob.set(wait: 3.seconds).perform_later(params[:id].to_i, nil, nil, current_user)
    redirect_to root_path
  end

  def show
    authorize @game
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end
end
