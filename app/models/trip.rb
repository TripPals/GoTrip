class Trip < ApplicationRecord
  validates :name, :length, :start_date, presence: true
  validates :length, numericality: { greater_than: 0,  only_integer: true }

  has_many :user_trips
  has_many :users through :user_trips

end
