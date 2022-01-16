class AddSpotCommentToScheduleSpots < ActiveRecord::Migration[6.1]
  def change
    add_column :schedule_spots, :spot_comment, :text
  end
end
