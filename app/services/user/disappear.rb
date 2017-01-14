class User::Disappear
  def initialize(current_user)
    @current_user = current_user
  end

  def call
    current_user.update(is_available: false)
    ActionCable.server.broadcast("available_users", current_user)
  end

  private

  attr_reader :current_user
end