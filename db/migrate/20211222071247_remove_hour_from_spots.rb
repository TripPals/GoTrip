class RemoveHourFromSpots < ActiveRecord::Migration[6.1]
  def change
    remove_column :spots, :hour, :string
  end
end
