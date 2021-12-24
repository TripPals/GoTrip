class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :remember_created_at, :datetime
    add_column :users, :name, :string
    add_column :users, :provider, :string, default: 'register' 
    add_column :users, :uid, :string
  end
end
