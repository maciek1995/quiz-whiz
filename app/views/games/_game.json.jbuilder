json.game_status game.status
json.current_question_index game.current_question_index
json.users game.user_games do |user_game|
  json.id user_game.user.id
  json.email user_game.user.email
  json.avatar_path user_game.user.avatar_path
  json.username user_game.user.username
  json.lastAnswered user_game.last_answered
end
