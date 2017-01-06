class AddNameToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :avatar_path, :string
  end
end
