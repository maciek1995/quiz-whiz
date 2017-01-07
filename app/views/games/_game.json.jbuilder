json.game_status game.status
json.users game.users do |user|
  json.email user.email
  json.avatar_path user.avatar_path
  json.username user.username
  json.answers(user.answers, :score, :game_question_id)
end
