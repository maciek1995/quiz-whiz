json.(game, :status)
json.users game.users do |user|
  json.email user.email
  json.answers(user.answers, :score, :game_question_id)
end
