class Spot < ApplicationRecord
  has_many :schedule_spots
  has_many :schedules, through: :schedule_spots
end