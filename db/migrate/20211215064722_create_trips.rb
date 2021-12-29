class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.string :name
      t.integer :length, default:1
      t.timestamp :start_date
      t.timestamp :end_date
      t.string :status 

      t.timestamps
    end
  end
end
