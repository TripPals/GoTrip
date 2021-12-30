class Schedule < ApplicationRecord
  belongs_to :trip 
  has_many :schedule_spots
  has_many :spots, through: :schedule_spots
end
