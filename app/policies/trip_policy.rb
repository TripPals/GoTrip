class TripPolicy < ApplicationPolicy
    attr_reader :user, :trip

    def initialize(user, trip)
      @user = user
      @trip = trip
    end
  
    def edit?
    # byebug
    p record
    # record = Trip.find(params[:trip_id])
      
      user.user_trips.find_by(trip: trip).owner? ||
      user.user_trips.find_by(trip: trip).editor?
    #   user.user_trip_authority.owner? || !post.published?

    end

    def destroy?
      user.user_trips.find_by(trip: trip).owner?
    end
end