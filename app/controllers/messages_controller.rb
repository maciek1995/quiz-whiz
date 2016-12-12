class MessagesController < ApplicationController
  
    def create
    message = Message.new(message_params)
    message.user = current_user
    if message.save
      ActionCable.server.broadcast 'messages',
        message: message.text,
        user: message.user.email
      head :ok
    else 
      # redirect_to url_for(:controller => :games_controller, :action => :action_name) 
    end
  end

  private

    def message_params
      params.require(:message).permit(:text, :game_id)
    end

end
