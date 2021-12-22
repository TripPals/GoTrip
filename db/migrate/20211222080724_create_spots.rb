class CreateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :spots do |t|
      t.string :name
      t.string :city
      t.text :description
      t.string :phone
      t.string :monday_hr
      t.string :tuesday_hr
      t.string :wednesday_hr
      t.string :thursday_hr
      t.string :friday_hr
      t.string :saturday_hr
      t.string :sunday_hr
      t.decimal :latitude
      t.decimal :longitude
      t.string :place_id
      t.string :photo_reference_1
      t.string :photo_reference_2
      t.string :photo_reference_3
      t.string :photo_reference_4
      t.string :photo_reference_5
      t.string :photo_reference_6

      t.timestamps
    end
  end
end
