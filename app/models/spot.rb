class Spot < ApplicationRecord
  has_many :schedule_spots, dependent: :delete_all
  has_many :schedules, through: :schedule_spots
end