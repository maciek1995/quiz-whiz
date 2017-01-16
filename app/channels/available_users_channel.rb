class AvailableUsersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "available_users"
  end

  def unsubscribed
    User::Disappear.new(current_user).call
  end

  def appear
    User::Appear.new(current_user).call
  end
end
