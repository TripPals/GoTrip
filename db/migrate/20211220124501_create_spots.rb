class CreateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :spots do |t|
      t.string :name
      t.string :city
      t.text :description
      t.string :phone
      t.string :address
      t.string :hour
      t.decimal :latitude
      t.decimal :longitude
      t.string :place_id

      t.timestamps
    end
  end
end
