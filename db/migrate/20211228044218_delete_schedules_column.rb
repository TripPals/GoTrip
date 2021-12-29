class DeleteSchedulesColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :schedules, :starting_time, :timestamp

    remove_column :schedules, 
    :spot_id, :integer

    remove_column :schedules, 
    :stayed_time, :integer
    
    remove_column :schedules,
     :spot_order, :integer
    
    remove_column :schedules,
    :note, :text
     
     
  end
end
