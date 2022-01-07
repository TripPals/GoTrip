class Api::V1::TripDetailController < ApplicationController
  def show
    @trip = Trip.find(params[:trip_id])
  end
end