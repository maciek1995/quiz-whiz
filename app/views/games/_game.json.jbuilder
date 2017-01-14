json.game_status game.status
json.users game.users do |user|
  json.id user.id
  json.email user.email
  json.avatar_path user.avatar_path
  json.username user.username
  json.answer answer if user == current_user
end
