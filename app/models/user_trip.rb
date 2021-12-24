class UserTrip < ApplicationRecord
  belongs_to :user
  belongs_to :trip

  enum role: {
    owner: 0,
    viewer: 1,
    editor: 2,
  },_default: :viewer
end
