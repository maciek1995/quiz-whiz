class GamePolicy < ApplicationPolicy
  def show?
    game_participant?
  end

  def abort?
    game_participant?
  end

  def finish?
    game_participant?
  end

  def decline_invitation?
    game_participant?
  end

  def accept_invitation?
    game_participant?
  end
end