json.(game, :id, :status, :name, :created_at, :updated_at)
json.opponent do
  json.email (game.users - [current_user]).first.email
end if game.users.count == 2
json.current_user(current_user, :email)
json.questions(game.questions, :text, :answers, :correct_answer)
