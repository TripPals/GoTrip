require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive.scoped_to(:provider) }
    it { should validate_presence_of(:password).on(:create) }
    it { should validate_confirmation_of(:password).on(:create) }
    it do
      should validate_length_of(:password).
        is_at_least(6).is_at_most(128)
    end
  end

  describe 'associations' do
    it { should have_many(:trips).through(:user_trips) }
    it { should have_many(:user_trips).dependent(:delete_all) }
  end
end


