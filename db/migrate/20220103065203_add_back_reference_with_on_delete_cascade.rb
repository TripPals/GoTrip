class AddBackReferenceWithOnDeleteCascade < ActiveRecord::Migration[6.1]
  def change
    add_reference :schedules, :trip, index: true, foreign_key: { on_delete: :cascade }
    add_reference :schedule_spots, :spot, index: true, foreign_key: { on_delete: :cascade }
    add_reference :schedule_spots, :schedule, index: true, foreign_key: { on_delete: :cascade }
    add_reference :user_trips, :user, index: true, foreign_key: { on_delete: :cascade }
    add_reference :user_trips, :trip, index: true, foreign_key: { on_delete: :cascade }
  end
end
