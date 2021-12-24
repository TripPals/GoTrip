class MytripsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @trips = Trip.order(id: :desc)
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
end

def update
  @trip = Trip.find(params[:trip_id])

  if trip_params[:start_date].present?
    if @trip.update(trip_params.merge(end_date: trip_params[:start_date].to_date + trip_params[:length].to_i.days - 1.days))
      redirect_to mytrips_path, notice: "旅程更新成功！"
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
    @trip.destroy if @trip
    redirect_to mytrips_path, notice: "旅程已刪除"
  end

  private
  def trip_params
    params.require(:trip).permit(:name, :length, :start_date)
  end

  def plan
  end

end
