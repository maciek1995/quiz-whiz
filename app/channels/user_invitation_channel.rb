class UserInvitationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_invitation_#{params[:user_id]}"
  end

  def unsubscribed
    games = current_user.games.where(status: :intitation_pending)
    games.update_all(status: :aborted)
    games.each do |game|
      GameBroadcastJob.perform_later(game.id, nil, nil, current_user)
    end
  end

end
