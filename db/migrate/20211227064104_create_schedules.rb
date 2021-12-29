class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.references :trip, null: false, foreign_key: true
      t.integer :day_id
      t.timestamp :starting_time
      t.integer :spot_id
      t.integer :stayed_time
      t.integer :spot_order
      t.text :note

      t.timestamps
    end
  end
end
