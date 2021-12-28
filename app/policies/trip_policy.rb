class TripPolicy < ApplicationPolicy
    attr_reader :user, :trip

    def initialize(user, trip)
      @user = user
      @trip = trip
    end
  
    def edit?
    # byebug
      
    user.user_trips.find_by(trip_id: @trip.id).owner? ||
    user.user_trips.find_by(trip_id: @trip.id).editor?
    #   user.user_trip_authority.owner? || !post.published?
    
  end
  
  def destroy?
      user.user_trips.find_by(trip_id: @trip.trip_id).owner?
    end
end