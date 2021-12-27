class RightsController < ApplicationController
    before_action :authenticate_user!
    before_action :find_trip
    def invite
        @users = @trip.users
    end

    private

    def find_trip
        @trip = Trip.find(params[:trip_id])
    end
end
