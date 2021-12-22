class Trip < ApplicationRecord
  validates :name, :length, :start_date, presence: true
end
