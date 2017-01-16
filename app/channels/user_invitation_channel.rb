class UserInvitationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_invitation_#{params[:user_id]}"
  end

  def unsubscribed

  end
end
