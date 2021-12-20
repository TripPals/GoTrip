class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.datetime :date
      t.integer :spot_id
      t.integer :spot_order

      t.timestamps
    end
  end
end
