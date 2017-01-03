class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def game_participant?
    return false unless user
    if(user.games.include?(record) && (record.ready? || record.current? || record.pending?))
      return true
    else
      return false
    end
  end
end
