class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.string :text
      t.json 'answers'
      t.string :correct_answer, limit: 1, null: false

      t.timestamps
    end
  end
end
