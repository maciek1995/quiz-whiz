class User::AvailableQuery
  def initialize(users = User.all)
    @users = users
  end

  def call
    users.where(is_available: true)
  end

  private

  attr_reader :users
end