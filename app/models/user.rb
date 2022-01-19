class User < ApplicationRecord
  extend Devise::Models
  mount_uploader :avatar, AvatarUploader
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable, :validatable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,
         :omniauthable, omniauth_providers: [:google_oauth2, :github]
  
  # validation
  validates :email, presence: true
  validates :email, uniqueness: {:scope => :provider}
  validates :password, presence: true, confirmation: true, length: { in: 6..128 }, on: :create, if: lambda {self.password.present?}
  validates :password_confirmation, presence: true, if: lambda {self.password.present?}

  has_many :user_trips, dependent: :delete_all
  has_many :trips, through: :user_trips

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email 
      user.password = Devise.friendly_token[0,20]
      # user.name = auth.info.name
      # user.image = auth.info.image
    end
  end

  def display_name
    name == "" ? email : name
  end

  def current_trip_role(trip_id)
    user_trips.find_by(trip_id: trip_id).role
    # byebug
  end

  def show_image
    if avatar.present?
      avatar
    elsif image.present?
      image
    else
      avatar
    end
  end
  
end
