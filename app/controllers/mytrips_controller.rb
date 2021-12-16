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

    end
  end

  private
  def trip_params
    params.require(:trip).permit(:name, :length, :start_date)
  end
end
