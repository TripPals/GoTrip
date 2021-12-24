class ChangeIndexToUsers < ActiveRecord::Migration[6.1]
  def change
    add_index :users, [:email, :provider], unique: true
    remove_index :users, :column => :email
  end
end
