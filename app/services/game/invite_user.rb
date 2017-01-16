class Game::InviteUser
  def initialize(current_user, opponent_id)
    @current_user = current_user
    @opponent_id = opponent_id
  end

  def call
    opponent = User.find(opponent_id)
    game = Game.new(status: :pending_invitation, name: "Custom Game", caller: current_user)
    game.user_games.new(user: current_user)
    game.user_games.new(user: opponent)
    game.save!

    Question.order("RANDOM()").limit(10).each do |question|
      GameQuestion.create(game: game, question: question)
    end

    ActionCable.server.broadcast("user_invitation_#{opponent.id}", {user: opponent, game_id: game.id})

    return game
  end

  private

  attr_reader :current_user, :opponent_id
end
