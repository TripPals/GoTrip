class User < ApplicationRecord
  extend Devise::Models
  mount_uploader :avatar, AvatarUploader
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable, :validatable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,
         :omniauthable, omniauth_providers: [:google_oauth2, :github]
  #validation
  validates_presence_of   :email, presence: true
  validates_uniqueness_of :email, { scope: :provider }
  validates_presence_of   :password, { on: :create }
  validates_length_of     :password, in: 6..128, if: lambda {self.password.present?}
  validates_confirmation_of :password, if: lambda {self.password.present?}
  
  has_many :user_trips
  has_many :trips, through: :user_trips

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email 
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name
      user.image = auth.info.image
    end
  end

  def display_name
    name == "" ? email : name
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
