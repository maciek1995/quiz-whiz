# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170116123322) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_questions", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "question_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["game_id"], name: "index_game_questions_on_game_id", using: :btree
    t.index ["question_id"], name: "index_game_questions_on_question_id", using: :btree
  end

  create_table "games", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "status"
    t.integer  "caller_id"
    t.integer  "current_question_index", default: 0
    t.index ["caller_id"], name: "index_games_on_caller_id", using: :btree
  end

  create_table "questions", force: :cascade do |t|
    t.string   "text"
    t.json     "answers"
    t.string   "correct_answer", limit: 1, null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "user_games", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "game_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "score",         default: 0
    t.integer  "last_answered"
    t.index ["game_id"], name: "index_user_games_on_game_id", using: :btree
    t.index ["user_id"], name: "index_user_games_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "username"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "avatar_path"
    t.boolean  "is_available",           default: false
    t.integer  "games_played",           default: 0
    t.integer  "games_won",              default: 0
    t.integer  "games_drawn",            default: 0
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "game_questions", "games"
  add_foreign_key "game_questions", "questions"
  add_foreign_key "games", "users", column: "caller_id"
  add_foreign_key "user_games", "games"
  add_foreign_key "user_games", "users"
end
