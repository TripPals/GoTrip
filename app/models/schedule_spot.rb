class ScheduleSpot < ApplicationRecord
  belongs_to :schedule
  belongs_to :spot
end
