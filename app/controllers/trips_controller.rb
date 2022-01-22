class TripsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    time_today = DateTime.now().to_date
    
    @trips_yours = Trip.own_trip(current_user.id)
    @trips_yours_past = @trips_yours.where("? > end_date", time_today)
    @trips_yours_future = @trips_yours.where("start_date > ?", time_today)
    @trips_yours_now = @trips_yours.where("? >= start_date AND ? <= end_date", time_today, time_today)
    
    @trips_followed = Trip.followed_trip(current_user.id).select('user_trips.role, name, length, trips.id, start_date, end_date').order("trips.updated_at DESC")
    @trips_followed_past = @trips_followed.where("? > end_date", time_today)
    @trips_followed_future = @trips_followed.where("start_date > ?", time_today)
    @trips_followed_now = @trips_followed.where("? >= start_date AND ? <= end_date", time_today, time_today)

  end

  def new
    @trip = Trip.new
  end

  def create

  @trip = Trip.new(trip_params)

  if @trip.start_date.present?
    @trip.end_date = trip_params[:start_date].to_date + trip_params[:length].to_i.days - 1.days
    total_days = [] 
    days = trip_params[:length].to_i

    1.upto(days) do |day|
      total_days << Schedule.new(day_order: day)
      @trip.schedules = total_days
    end

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
    @trip = Trip.find_by(id: params[:trip_id])
    authorize @trip,  policy_class: TripPolicy
    @trip.destroy if @trip
    redirect_to trips_path, notice: "旅程已刪除"
  end

  def search
  end


  def plan

    allTrips = current_user.user_trips.select(:trip_id)
    tripids = []
    allTrips.each do |item|
      tripids.push(item.trip_id.to_s)
    end

    if tripids.include?(params[:trip_id]) == false
      redirect_to '/404'
    end

  end

  private
  def trip_params
    params.require(:trip).permit(:name, :length, :start_date)
  end


end
