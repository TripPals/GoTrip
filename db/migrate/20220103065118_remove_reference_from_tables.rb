class RemoveReferenceFromTables < ActiveRecord::Migration[6.1]
  def change
    remove_reference(:schedules, :trip, index: true, foreign_key: true)
    remove_reference(:schedule_spots, :spot, index: true, foreign_key: true)
    remove_reference(:schedule_spots, :schedule, index: true, foreign_key: true)
    remove_reference(:user_trips, :user, index: true, foreign_key: true)
    remove_reference(:user_trips, :trip, index: true, foreign_key: true)
  end
end
