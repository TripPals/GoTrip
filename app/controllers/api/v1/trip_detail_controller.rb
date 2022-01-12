class Api::V1::TripDetailController < ApplicationController
  def show
    @trip = Trip.find(params[:trip_id])
  end
  def update_name
    @trip = Trip.find_by(id: params[:trip_id])
    
    if @trip && params[:update_name] != ""
      @trip.update(name:params[:update_name])
      render status: 200, json: ["Name updated successfully"].to_json
    else
      render status: 404, json: ["update error"].to_json
    end
  end
end