class MytripsController < ApplicationController
  def index
    @trips = Trip.all
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.new(trip_params)
    if @trip.save
      redirect_to "/mytrips"
    else
      render :new
    end
  end

  def edit
    @trip = Trip.find(params[:trip_id])
  end
  
  def update
    if @trip.update(trip_params)
      redirect_to "/mytrips", notice: "旅程更新成功"
    else
      render :edit
    end
  end

  def destroy
    @trip.destroy
    redirect_to trip_path, notice: "旅程已刪除"
  end

  private
  def trip_params
    params.require(:trip).permit(:name, :length, :start_date)
  end
end
