class Api::V1::AuthoritiesController < ApplicationController

    def alluser
        @user_trip = UserTrip.find_by(trip_id: params[trip_id:])
        
    end

end