class AddTypeColumnToSpots < ActiveRecord::Migration[6.1]
  def change
    add_column :spots, :poi_type, :string
  end
end
