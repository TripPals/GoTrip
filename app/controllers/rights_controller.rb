class RightsController < ApplicationController
    before_action :authenticate_user!
    before_action :find_trip
    def search
        @email = params[:search]
        if @email.blank? || @email != User.find_by(:email)
            flash.alert = "請輸入使用者正確的e-mail"
            # render ：search
        else
            @results = User.where('email LIKE ?', search: "%#{@email}%")
        end
    end

    def create
    end

    def editrole
        @users = @trip.users
        @user_trip_role = UserTrip.new
    end


    private

    def find_trip
        @trip = Trip.find(params[:trip_id])
       
    end

end
