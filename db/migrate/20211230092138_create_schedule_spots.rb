class CreateScheduleSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :schedule_spots do |t|
      t.references :schedule, null: false, foreign_key: true
      t.references :spot, null: false, foreign_key: true
      t.integer :order

      t.timestamps
    end
  end
end
