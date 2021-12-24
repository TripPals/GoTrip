class MytripPolicy < ApplicationPolicy
    attr_reader :user, :trip

    def initialize(user, trip)
      @user = user
      @trip = trip
    end
  
    def edit?
    # byebug
      p record
      user.user_trips.find_by(trip: trip).owner?
    #   user.user_trip_authority.owner? || !post.published?
    
    puts "==============================="
    puts user.user_trips.find_by(trip: trip).owner?
    puts "==============================="

    end
end