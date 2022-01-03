class RightsController < ApplicationController
    before_action :authenticate_user!
    before_action :find_trip
    

    def editrole
        @users = @trip.users
        @user_trip_role = UserTrip.new
    end


    private

    def find_trip
        @trip = Trip.find(params[:trip_id])
       
    end

end
