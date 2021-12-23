class Trip < ApplicationRecord
  validates :name, :length, :start_date, presence: true
  validates :length, numericality: { greater_than: 0,  only_integer: true }
end
