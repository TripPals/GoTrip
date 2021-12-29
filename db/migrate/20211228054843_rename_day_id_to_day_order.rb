class RenameDayIdToDayOrder < ActiveRecord::Migration[6.1]
  def change
    rename_column :schedules, :day_id, :day_order
  end
end
