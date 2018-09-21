class AddLikedUsersToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :liked_users, :text
  end
end
