json.(game, :status)
json.users game.users do |user|
  json.name user.email
  json.answers(user.answers, :score, :game_question_id)
end
