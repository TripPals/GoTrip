class Api::V1::AuthoritiesController < ApplicationController

    def alluser
        # @users = UserTrip.find_by(trip_id: params[:trip_id]).user

        # @trip = params[:trip_id]
        # @users = UserTrip.joins(:users).where(@trip.present?)
        trip_id = params[:trip_id]
        @users = User.find_by_sql("SELECT user_trips.id, user_trips.role, users.name, users.email ,users.image FROM user_trips INNER JOIN users ON user_trips.user_id = users.id where trip_id = '#{trip_id}'")
        # @trip = Trip.find(params[:trip_id])
        # @users = @trip.user
        
        respond_to do |format|
            format.json{render :json =>  @users , status => 200}
        end
        
    end

end