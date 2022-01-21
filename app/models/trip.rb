class Trip < ApplicationRecord
  validates :name, :length, :start_date, presence: true
  validates :length, numericality: { greater_than: 0,  only_integer: true }
  has_many :schedules, dependent: :delete_all

  has_many :user_trips, dependent: :delete_all
  has_many :users, through: :user_trips

  attribute :role, :string

  scope :followed_trip, ->(user_id) {joins(:user_trips).where('user_trips.user_id = ? and user_trips.role != 0', user_id)}
  scope :own_trip, ->(user_id) {joins(:user_trips).where('user_trips.user_id = ? and user_trips.role = 0', user_id)}

end
