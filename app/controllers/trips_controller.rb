class TripsController < ApplicationController

    def index
        @trips_all = current_user.trips.all
        # @trips_yours = current_user.user_trip_authorities.owner
        @trips_yours = Trip.own_trip(current_user.id)
        @trips_followed = Trip.followed_trip(current_user.id)
    end
    
    def new
         @trip = Trip.new
    end

    def edit
        @trip = Trip.find(params[:trip_id])
        authorize @trip
    end

    def create
        @trip = current_user.trips.build(trip_params)
        if @trip.start_date.present?
           @trip.end_date = trip_params[:start_date].to_date + trip_params[:length].to_i.days - 1.days

        # 使用者新增行程的當下便是trip的owner
            if @trip.save
                UserTripAuthority.create(user: current_user,
                                        trip: @trip,
                                        role: "owner")
                redirect_to "/trips"
            
            else
                render :new
            end
        else
            render :new
        end  
    end

    def update
        @trip = Trip.find(params[:trip_id])
        if trip_params[:start_date].present?
            if @trip.update(trip_params.merge(end_date: trip_params[:start_date].to_date + trip_params[:length].to_i.days - 1.days))
        
            redirect_to trips_path, notice: "旅程更新成功"
            else
            render :edit
            end
        else
            render :edit
        end 
    end
    
    def destroy
        @trip = Trip.find_by(id: params[:trip_id])
    end

    private
    def trip_params
        params.require(:trip).permit(:name, :length, :start_date, :end_date)
    end

end