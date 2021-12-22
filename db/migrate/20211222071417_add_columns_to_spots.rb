class AddColumnsToSpots < ActiveRecord::Migration[6.1]
  def change
    add_column :spots, :monday_hr, :string
    add_column :spots, :tuesday_hr, :string
    add_column :spots, :wednesday_hr, :string
    add_column :spots, :thursday_hr, :string
    add_column :spots, :friday_hr, :string
    add_column :spots, :saturday_hr, :string
    add_column :spots, :sunday_hr, :string
    add_column :spots, :photo_reference_1, :string
    add_column :spots, :photo_reference_2, :string
    add_column :spots, :photo_reference_3, :string
    add_column :spots, :photo_reference_4, :string
    add_column :spots, :photo_reference_5, :string
    add_column :spots, :photo_reference_6, :string
  end
end
