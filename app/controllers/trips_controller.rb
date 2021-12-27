class TripsController < ApplicationController
  before_action :authenticate_user!
  
  def index
   
    # @trips = Trip.order(id: :desc)
    @trips_all = current_user.trips.all
    # @trips_yours = current_user.user_trip_authorities.owner
    @trips_yours = Trip.own_trip(current_user.id)
    @trips_followed = Trip.followed_trip(current_user.id)
  end

  def new
    @trip = Trip.new
  end

  # def create
  #   @trip = Trip.new(trip_params)
  #   if @trip.save
  #     redirect_to "/mytrips"
  #   else
  #     render :new
  #   end
  # end

#Add Schedule
def create

  @trip = Trip.new(trip_params)

  if @trip.start_date.present?
    @trip.end_date = trip_params[:start_date].to_date + trip_params[:length].to_i.days - 1.days

    if @trip.save
        UserTrip.create(user: current_user,
                        trip: @trip,
                        role: "owner")

      redirect_to "/mytrips", notice: "新增旅程成功!"
    else
      flash.alert = "旅程新增未成功。"
      render :new
    end

  else
      flash.alert = "請選擇開始日期！"
      render :new
  end  

end


def edit
  @trip = Trip.find(params[:trip_id])
  authorize @trip
end

def update
  @trip = Trip.find(params[:trip_id])

  if trip_params[:start_date].present?
    if @trip.update(trip_params.merge(end_date: trip_params[:start_date].to_date + trip_params[:length].to_i.days - 1.days))
      redirect_to trips_path, notice: "旅程更新成功！"
    else
      flash.alert = "旅程未更新。"
      render :edit
    end
  else
    flash.alert = "請選擇起始日期！"
    render :edit
  end    
end

  def destroy
    @trip = UserTrip.find_by(trip_id: params[:trip_id])
    # && Trip.find_by(id: params[:trip_id])
    authorize @trip,  policy_class: TripPolicy
    @trip.destroy if @trip
    redirect_to trips_path, notice: "旅程已刪除"
  end

  private
  def trip_params
    params.require(:trip).permit(:name, :length, :start_date)
  end

  def plan
  end

end
